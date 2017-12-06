import { Router, Request, Response, NextFunction } from 'express';
import * as jwtWebToken from 'jsonwebtoken';
import * as passwordHash from 'password-hash';

import { Globals } from '../constants';
import { LoginPost } from '../viewModels/auth/loginPost';
import { IUser, User } from '../models/user';
import { UserMapper } from '../mappers/userMapper';
import { AuthValidator } from '../validators/authValidator';
import { AuthService } from '../services/AuthService';

export class AuthRouter {
    router: Router;

    authService: AuthService;

    constructor() {
        this.router = Router();
        this.authService = new AuthService();
        this.init();
    }

    init() {
        this.router.post('/login', this.login);
        this.router.post('/signUp', this.signUp);
    }

    public signUp = (req: Request, res: Response, next: NextFunction) => {
        AuthValidator.validateSignup(req)
            .then(() => {
                let newUser = new User(UserMapper.postMap(req.body));

                this.authService.signUp(newUser)
                    .then((user) => {
                        res.status(201)
                            .send({
                                id: newUser.id
                            });
                    })
                    .catch((error) => {
                        res.status(400)
                            .send({
                                errors: ['An unknown error occured.']
                            });

                        return;
                    });
            })
            .catch(errors => {
                res.status(400)
                    .send({
                        errors: errors.mapped()
                    });

                return;
            });
    }

    public login = (req: Request, res: Response, next: NextFunction) => {
        AuthValidator.validateLogin(req)
            .then(() => {
                User.findOne({ userName: req.body.userName }, (err, user) => {
                    if (!user || !passwordHash.verify(req.body.password, user.password)) {
                        res.status(400)
                            .send('Unable to login');

                        return
                    }

                    let token = jwtWebToken.sign({
                        data: 'test'
                    }, Globals.secret);

                    res.status(200)
                        .send(token);
                });
            })
            .catch(errors => {
                res.status(400)
                    .send({
                        errors: errors.mapped()
                    });

                return;
            });
    }
}

const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;
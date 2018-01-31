import { Router, Request, Response, NextFunction } from 'express';
import { auth } from 'googleapis';
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
    }

    public login = (req: Request, res: Response, next: NextFunction) => {
        AuthValidator.validateLogin(req)
            .then(() => {
                let client = new auth.OAuth2('285932991733-l0qg668r4ta1frace6bsteoo2vquh2m4.apps.googleusercontent.com', '', '');
                client.verifyIdToken({
                    idToken: req.body.token,
                    audience: '285932991733-l0qg668r4ta1frace6bsteoo2vquh2m4.apps.googleusercontent.com'
                }, (e, login) => {
                    let payload = login.getPayload();
                    let userId = payload.sub;

                    User.findOne({ googleId: userId }, (err, user) => {
                        if (user) {
                            res
                                .status(200)
                                .send(UserMapper.viewMap(user, this.createToken(user)));
                        }
                        else {
                            let newUser = new User({
                                googleId: userId,
                                firstName: payload.given_name,
                                lastName: payload.family_name,
                                picture: payload.picture,
                                email: payload.email
                            });

                            newUser.save((err) => {
                                res
                                    .status(201)
                                    .send(UserMapper.viewMap(newUser, this.createToken(newUser)));
                            });
                        }
                    });
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

    protected createToken(user: IUser) {
        const payload = {
            id: user.id,
            admin: false
        };

        return jwtWebToken.sign(payload, Globals.secret);
    }
}

const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;
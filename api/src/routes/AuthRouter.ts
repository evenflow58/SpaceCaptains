import { Router, Request, Response, NextFunction } from 'express';
import { auth } from 'googleapis';
import * as jwtWebToken from 'jsonwebtoken';
import * as passwordHash from 'password-hash';

import { Globals } from '../constants';
import { LoginPost } from '../viewModels/auth/loginPost';
import { IUser, User } from '../models/user';
import { UserMapper } from '../mappers/userMapper';
import { AuthValidator } from '../validators/authValidator';

export class AuthRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.post('/login', this.login);
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await AuthValidator.validateLogin(req);

            let client = new auth.OAuth2('285932991733-l0qg668r4ta1frace6bsteoo2vquh2m4.apps.googleusercontent.com', '', '');

            // Google doesn't use promises so we can't await them. Need to use a callback :(
            client.verifyIdToken({
                idToken: req.body.token,
                audience: '285932991733-l0qg668r4ta1frace6bsteoo2vquh2m4.apps.googleusercontent.com'
            }, async (e, login) => {
                try {
                    let payload = login.getPayload();
                    let userId = payload.sub;

                    let user = await User.findOne({ googleId: userId });

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

                        let createdUser = await newUser.save();

                        res
                            .status(201)
                            .send(UserMapper.viewMap(createdUser, this.createToken(createdUser)));
                    }
                }
                catch (e) {
                    res.status(400)
                        .send({
                            errors: e.mapped()
                        });

                    return;
                }
            });
        }
        catch (e) {
            res.status(400)
                .send({
                    errors: e.mapped()
                });

            return;
        }
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
import * as jwtWebToken from 'jsonwebtoken';
import * as passwordHash from 'password-hash';

import { IUser, User } from '../models/user';

export class AuthService {
    public signUp = (newUser: IUser): Promise<IUser> => {
        return new Promise((resolve, reject) => {
            User.findOne({ userName: newUser.userName }, (err, user) => {
                if (!user) {
                    newUser.password = passwordHash.generate(newUser.password);

                    newUser.save((err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(newUser);
                        }
                    });
                } else {
                    reject('User already exists.');
                }
            });
        });
    }
}
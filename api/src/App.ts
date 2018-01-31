import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as expressJwt from 'express-jwt';
import * as mongoose from 'mongoose';
import * as session from 'express-session';
import * as cors from 'cors';
import expressValidator = require('express-validator');

import { Globals } from './constants';

import UserRouter from './routes/UserRouter';
import AuthRouter from './routes/AuthRouter';

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.database();
        this.middleware();
        //this.routes();
    }

    private database(): void {
        mongoose.connect('mongodb://127.0.0.1:27017/SpaceCaptains');
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(expressValidator({
            customValidators: {
                hasNoSpaces: (value): boolean => {
                    if (!value) {
                        return true;
                    }
                    return value.indexOf(' ') < 0;
                }
            }
        }));
        // This must go immediately after the body parser
        this.express.use(bodyParser.urlencoded({ extended: false }));

        this.express.use('/api', expressJwt({ secret: Globals.secret })
            .unless({
                path: [
                    '/',
                    '/api/auth/login'
                ]
            }));

        const options: cors.CorsOptions = {
            allowedHeaders: [
                "Origin",
                "X-Requested-With",
                "Content-Type",
                "Accept",
                "X-Access-Token",
                "Authorization"
            ],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE,OPTIONS",
            origin: '*',
            preflightContinue: false
        };

        this.express.use(cors(options));

        this.routes();

        this.express.options("*", cors(options));
    }

    private routes(): void {
        let router = express.Router();

        this.express.use(express.static(path.join(__dirname, '../../client/dist')));
        router.get('/', (req, res, next) => {
            res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
        });

        this.express.use('/api', router);

        this.express.use('/api/auth', AuthRouter);

        this.express.use('/api/user', UserRouter);
    }
}

export default new App().express;
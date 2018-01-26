import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import { UserMapper } from '../mappers/userMapper';

export class UserRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getById);

        this.router.post('/', this.create)
    }

    public create(req: Request, res: Response, next: NextFunction) {
        let newUser = new User(UserMapper.postMap(req.body));

        newUser.save((err) => {
            res.status(201)
                .send({ id: newUser.id });
        });
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        User.find((err, users) => {
            res.send(UserMapper.viewMapArray(users));
        });
    }

    public getById(req: Request, res: Response, next: NextFunction) {
        User.findById(req.params.id, (err, user) => {
            res.send(UserMapper.viewMap(user));
        });
    }
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;
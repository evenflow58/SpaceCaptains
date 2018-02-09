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
        // this.router.get('/:id', this.getById);

        // this.router.post('/', this.create)
    }

    // public create(req: Request, res: Response, next: NextFunction) {
    //     let newUser = new User(UserMapper.postMap(req.body));

    //     newUser.save((err) => {
    //         res.status(201)
    //             .send({ id: newUser.id });
    //     });
    // }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        let users = await User.find();

        res.send(UserMapper.viewMapArray(users));
    }

    // public getById(req: Request, res: Response, next: NextFunction) {
    //     User.findOne({ googleId: req.params.id }, (err, user) => {
    //         if (user) {
    //             res.send(UserMapper.viewMap(user));
    //         }
    //         else {
    //             res.send(null);
    //         }
    //     });
    // }
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;
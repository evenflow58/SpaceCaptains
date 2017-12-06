import { IUser } from '../models/user';
import { UserView } from '../viewModels/user/userView';
import { UserPost } from '../viewModels/user/userPost';
import { BaseMapper } from './baseMapper';

export class UserMapper extends BaseMapper {
    public static viewMapArray(users: Array<IUser>): Array<UserView> {
        return this.mapArray(users, (user) => this.viewMap(user));
    }

    public static viewMap(user: IUser): UserView {
        return {
            id: parseInt(user.id),
            userName: user.userName
        } as UserView;
    }

    public static postMap(user: UserPost): IUser {
        return {
            password: user.password,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        } as IUser;
    }
}
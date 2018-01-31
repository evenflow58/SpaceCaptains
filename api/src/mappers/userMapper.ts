import { IUser } from '../models/user';
import { UserView } from '../viewModels/user/userView';
import { UserPost } from '../viewModels/user/userPost';
import { BaseMapper } from './baseMapper';
import { ObjectId } from 'bson';

export class UserMapper extends BaseMapper {
    public static viewMapArray(users: Array<IUser>): Array<UserView> {
        return this.mapArray(users, (user) => this.viewMap(user, ''));
    }

    public static viewMap(user: IUser, token: string): UserView {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            token: token
        } as UserView;
    }
}
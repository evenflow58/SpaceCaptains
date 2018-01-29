import { User } from "../models/user";

export class UserMapper {
    public static Map(json: any) {
        return {
            id: json.id,
            firstName: json.firstName,
            lastName: json.lastName
        } as User;
    }
}
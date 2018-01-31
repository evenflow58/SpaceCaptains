import { User } from "../models/user";

export class UserMapper {
    public static Map(json: any) {
        if (json) {
            return {
                id: json.id,
                name: json.name,
                email: json.email
            } as User;
        }

        return null;
    }
}
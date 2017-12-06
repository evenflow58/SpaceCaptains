import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
    id: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
}

let userSchema: Schema = new Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String
});

export const User = model<IUser>('User', userSchema);
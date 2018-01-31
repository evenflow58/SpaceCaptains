import { Document, Schema, model } from 'mongoose';
import { ObjectId } from 'bson';

export interface IUser extends Document {
    googleId: number,
    firstName: string;
    lastName: string;
    picture: string;
    email: string;
}

let userSchema: Schema = new Schema({
    googleId: Number,
    firstName: String,
    lastName: String,
    picture: String,
    email: String
});

export const User = model<IUser>('User', userSchema);
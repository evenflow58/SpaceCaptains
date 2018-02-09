import { Document, Schema, model } from "mongoose";

export interface IGame extends Document {
    name: string;
    ownerId: string;
}

let gameSchema: Schema = new Schema({
    name: String,
    ownerId: String
});

export const Game = model<IGame>('Game', gameSchema);
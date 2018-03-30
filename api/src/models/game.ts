import { Document, Schema, model } from "mongoose";
import { IBoardPiece } from './boardPiece';

export interface IGame extends Document {
    name: string;
    ownerId: string;
    boardPieces: Array<IBoardPiece>;
}

let gameSchema: Schema = new Schema({
    name: String,
    ownerId: String,
    boardPieces: [{ type: Schema.Types.ObjectId, ref: 'BoardPiece' }]
});

export const Game = model<IGame>('Game', gameSchema);
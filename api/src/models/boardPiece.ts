import { Document, Schema, model } from "mongoose";

export interface IBoardPiece extends Document {
    piece: number;
    x: number;
    y: number;
}

let boardPieceSchema: Schema = new Schema({
    piece: Number,
    x: Number,
    y: Number
});

export const BoardPiece = model<IBoardPiece>('BoardPiece', boardPieceSchema);
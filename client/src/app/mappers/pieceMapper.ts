import { BoardPiece } from "../models/boardPiece";

export class PieceMapper {
    public static Map(json: any) {
        if (json) {
            return {
                pieceNumber: json.pieceNumber,
                x: json.x,
                y: json.y
            } as BoardPiece;
        }

        return null;
    }
}
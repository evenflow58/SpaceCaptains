import { BaseMapper } from "./baseMapper";
import { IBoardPiece } from "../models/boardPiece";
import { BoardPieceView } from "../viewModels/game/boardPieceView";

export class BoardPieceMapper extends BaseMapper {
    public static viewMapArray(pieces: Array<IBoardPiece>): Array<BoardPieceView> {
        return this.mapArray(pieces, piece => this.viewMap(piece));
    }

    public static viewMap(piece: IBoardPiece): BoardPieceView {
        return {
            pieceNumber: piece.piece,
            x: piece.x,
            y: piece.y
        } as BoardPieceView;
    }
}
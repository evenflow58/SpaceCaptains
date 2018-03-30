import { Game } from "../models/game";
import { Observable } from "rxjs/Observable";
import { PieceMapper } from "./pieceMapper";
import { BoardPiece } from "../models/boardPiece";

export class GameMapper {
    public static MapArray(json: any): Array<Game> {
        return json.MapArray(GameMapper.Map);
    }

    public static Map(json: any): Game {
        if (json) {
            let pieces = new Array<Array<BoardPiece>>();

            // Break pieces into a more consumable for for the front end.
            json.pieces.forEach((piece: BoardPiece) => {
                if (pieces[piece.pieceNumber]) {
                    pieces[piece.pieceNumber].push(piece);
                } else {
                    pieces[piece.pieceNumber] = new Array<BoardPiece>(piece);
                }
            });

            return {
                id: json.id,
                name: json.name,
                pieces: pieces
            } as Game;
        }

        return null;
    }
}
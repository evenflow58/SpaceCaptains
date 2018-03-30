import { BaseMapper } from "./baseMapper";
import { GameView } from "../viewModels/game/gameView";
import { IGame } from "../models/game";
import { IBoardPiece } from "../models/boardPiece";
import { BoardPieceMapper } from "./boardPieceMapper";
import { BoardPieceView } from "../viewModels/game/boardPieceView";

export class GameMapper extends BaseMapper {
    public static viewMapArray(games: Array<IGame>): Array<GameView> {
        return this.mapArray(games, game => this.viewMap(game));
    }

    public static viewMap(game: IGame): GameView {
        return {
            id: game.id,
            name: game.name,
            pieces: game.boardPieces ? BoardPieceMapper.viewMapArray(game.boardPieces) : new Array<BoardPieceView>()
        } as GameView;
    }
}
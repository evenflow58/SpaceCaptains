import { BaseMapper } from "./baseMapper";
import { GameView } from "../viewModels/game/gameView";
import { IGame } from "../models/game";
import { IBoardPiece } from "../models/boardPiece";
import { BoardPieceMapper } from "./boardPieceMapper";

export class GameMapper extends BaseMapper {
    public static viewMapArray(games: Array<IGame>): Array<GameView> {
        return this.mapArray(games, game => this.viewMap(game));
    }

    public static viewMap(game: IGame, pieces: Array<IBoardPiece> = null): GameView {
        return {
            id: game.id,
            name: game.name,
            pieces: BoardPieceMapper.viewMapArray(pieces)
        } as GameView;
    }
}
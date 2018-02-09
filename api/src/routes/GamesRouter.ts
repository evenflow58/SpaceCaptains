import { Router, Request, Response, NextFunction } from 'express';
import { Game } from '../models/game';
import { GameMapper } from '../mappers/gameMapper';
import { BoardPiece, IBoardPiece } from '../models/boardPiece';

export class GamesRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.get);
        this.router.post('/', this.post);
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        let games = await Game.find();

        res.send(GameMapper.viewMapArray(games));
    }

    public async get(req: Request, res: Response, next: NextFunction) {
        let game = await Game.findById(req.params.id);

        res.send(GameMapper.viewMap(game));
    }

    public async post(req: Request, res: Response, next: NextFunction) {
        let minPlanets: number = 3,
            maxPlanets: number = 5;

        try {
            let newGame = await Game.create({
                name: req.body.name,
                ownerId: req.user.id
            });

            let boardPieces: Array<IBoardPiece> = new Array<IBoardPiece>();

            for (let pieceCounter = 0; pieceCounter < 3; pieceCounter++) {
                for (let spotCounter = 0; spotCounter < Math.floor(Math.random() * (maxPlanets - minPlanets + 1) + minPlanets); spotCounter++) {
                    let x: number = Math.floor(Math.random() * 3);
                    let y: number = Math.floor(Math.random() * 3);

                    if (!boardPieces.find(b => b.x === x && b.y === y)) {
                        boardPieces.push({
                            gameId: newGame._id,
                            piece: pieceCounter,
                            x: x,
                            y: y
                        } as IBoardPiece);
                    }
                }
            }

            let boardPiceSaves = new Array<Promise<any>>();

            boardPieces.forEach(boardPiece => {
                boardPiceSaves.push(BoardPiece.create(boardPiece));
            });

            await Promise.all(boardPiceSaves);

            let createdGame = GameMapper.viewMap(newGame, boardPieces);

            res.status(201)
                .send(createdGame);
        } catch (e) {
            debugger;
        }
    }
}

const gameRoutes = new GamesRouter();
gameRoutes.init();

export default gameRoutes.router;
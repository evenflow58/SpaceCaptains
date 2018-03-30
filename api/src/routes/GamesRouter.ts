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
        let games = await Game.find()

        res.send(GameMapper.viewMapArray(games));
    }

    public async get(req: Request, res: Response, next: NextFunction) {
        let game = await await Game.findById(req.params.id)
            .populate('boardPieces');

        res.send(GameMapper.viewMap(game));
    }

    public async post(req: Request, res: Response, next: NextFunction) {
        let minPlanets: number = 3,
            maxPlanets: number = 5;

        try {
            let boardPieces: Array<IBoardPiece> = new Array<IBoardPiece>();

            for (let pieceCounter = 0; pieceCounter < 3; pieceCounter++) {
                for (let spotCounter = 0; spotCounter < Math.floor(Math.random() * (maxPlanets - minPlanets + 1) + minPlanets); spotCounter++) {
                    let x: number = Math.floor(Math.random() * 3);
                    let y: number = Math.floor(Math.random() * 3);

                    if (!boardPieces.find(b => b.x === x && b.y === y)) {
                        boardPieces.push({
                            piece: pieceCounter,
                            x: x,
                            y: y
                        } as IBoardPiece);
                    }
                }
            }

            let boardPieceSaves = new Array<Promise<any>>();

            boardPieces.forEach(boardPiece => {
                boardPieceSaves.push(BoardPiece.create(boardPiece));
            });

            let savedPieces = await Promise.all(boardPieceSaves);

            let newGame = await Game.create({
                name: req.body.name,
                ownerId: req.user.id,
                boardPieces: savedPieces
            });

            let createdGame = await await Game.findById(req.params.id)
                .populate('boardPieces');

            res.status(201)
                .send(createdGame);
        } catch (e) {
            res.status(400)
                .send({
                    errors: e.mapped()
                });
        }
    }
}

const gameRoutes = new GamesRouter();
gameRoutes.init();

export default gameRoutes.router;
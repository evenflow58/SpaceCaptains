import { BoardPiece } from './boardPiece';

export class Game {
    id: string;
    name: string;
    pieces: Array<Array<BoardPiece>>;
}
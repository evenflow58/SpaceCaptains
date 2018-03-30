import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { BoardPiece } from '../../../models/boardPiece';

@Component({
  selector: 'game-piece',
  templateUrl: './game-piece.component.html',
  styleUrls: ['./game-piece.component.css']
})
export class GamePieceComponent implements OnInit {
  @Input()
  pieces: Array<BoardPiece>;

  // pieceArrayIndexes: Array<number> = new Array<number>(1, 2, 3, 4, 5, 6, 7, 8, 9);

  imagePath: string = 'assets/Planet.gif';

  constructor() { }

  ngOnInit() {

  }

  public counter(maxNumber: number) {
    let array: Array<number> = new Array<number>();

    for (let x = 1; x <= maxNumber; x++) {
      array.push(x);
    }

    return array;
  }

  public hasPiece(x: number, y: number) {
    return this.pieces.filter(piece => piece.x === x && piece.y === y).length > 0;
  }

  public isSun(x: number, y: number) {
    return x == 2 && y == 2;
  }
}

import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { GameService } from '../../services/game/game.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  public game: Game;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.gameService.get(params.get('id'))
      ).subscribe(game => {
        this.game = game
      });
  }

}

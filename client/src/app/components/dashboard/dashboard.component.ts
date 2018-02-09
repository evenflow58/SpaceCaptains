import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material';
import { NewGameWindowComponent } from '../new-game-window/new-game-window.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public games: Array<Game>;

  constructor(
    private gamesService: GameService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.gamesService.getAll().subscribe(games => {
      this.games = games;
    });
  }

  openNewGameWindow() {
    let dialogRef = this.dialog
      .open(NewGameWindowComponent, {
        data: {}
      })
      .afterClosed().subscribe(result => {
        debugger;
      });
  }
}

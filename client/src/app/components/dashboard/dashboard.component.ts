import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { Game } from '../../models/game';
import { MatDialog, MatSelectionList } from '@angular/material';
import { NewGameWindowComponent } from '../new-game-window/new-game-window.component';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public games: Array<Game>;

  constructor(
    private gamesService: GameService,
    private dialog: MatDialog,
    private router: Router
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

  navigateToGame(gamesList: MatSelectionList) {
    if (gamesList.selectedOptions.selected.length !== 1) {
      //TODO: Show an error message.
      return;
    }

    let game = gamesList.selectedOptions.selected.map(item => item.value)[0] as Game;

    this.router.navigate(['/gameBoard', game.id]);
  }
}

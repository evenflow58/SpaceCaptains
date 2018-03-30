import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Game } from '../../models/game';
import { Router } from '@angular/router';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'new-game-window',
  templateUrl: './new-game-window.component.html',
  styleUrls: ['./new-game-window.component.css']
})
export class NewGameWindowComponent implements OnInit {
  public gameName: string;

  constructor(
    private dialogRef: MatDialogRef<NewGameWindowComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private gameService: GameService
  ) {

  }

  ngOnInit() {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  createGame(): void {
    this.gameService.create({
      name: this.gameName
    } as Game)
      .subscribe(result => {
        this.dialogRef.close(result);
      });
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import { Game } from '../../models/game';

@Injectable()
export class GameService {

  constructor(
    private apiService: ApiService
  ) {

  }

  public getAll(): Observable<Array<Game>> {
    return this.apiService.get<Array<Game>>('game');
  }

  public get(id: string): Observable<Game> {
    return this.apiService.get<Game>(`game/${id}`);
  }

  public create(game: Game): Observable<Game> {
    return this.apiService.post<Game>('game', game);
  }
}

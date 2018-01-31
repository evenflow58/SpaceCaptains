import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';

@Injectable()
export class AuthService {

  constructor(
    private apiService: ApiService
  ) {
  }

  public login(token: string): Observable<User> {
    return this.apiService.post<User>('auth/login', { token: token });
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {

  constructor(
    private apiService: ApiService
  ) {

  }

  public login(username: string, password: string) {
    return this.apiService.post('auth/login', { userName: username, password: password });
  }
}
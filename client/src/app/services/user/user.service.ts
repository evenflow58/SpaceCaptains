import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class UserService {

  constructor(
    private apiService: ApiService
  ) {
  }

  public get(userId: string) {
    return this.apiService.get(`user`);
  }
}

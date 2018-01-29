import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserMapper } from '../../mappers/userMapper';

@Injectable()
export class UserService {

  constructor(
    private apiService: ApiService
  ) {
  }

  public get(userId: string) {
    return this.apiService.get(`user`)
      .map(data => UserMapper.Map(data));
  }
}

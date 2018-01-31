import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import { UserMapper } from '../../mappers/userMapper';
import { User } from '../../models/user';

@Injectable()
export class UserService {

  constructor(
    private apiService: ApiService
  ) {
  }

  // public get(userId: string) {
  //   return this.apiService.get<User>(`user/${userId}`)
  //     .map((data) => UserMapper.Map(data));
  // }

  // public create(user: User) {
  //   return this.apiService.post('user', user);
  // }

  public getAll(): Observable<Array<User>> {
    return this.apiService.get<Array<User>>(`user`);
    //.map((data) => UserMapper.Map(data));
  }
}

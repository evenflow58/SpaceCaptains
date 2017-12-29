import { appVariables } from '../app.constants';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';

@Injectable()
export class CanActivateService implements CanActivate {

  constructor() { }

  canActivate() {
    debugger;
    let token = localStorage.getItem(appVariables.token);

    if (token) {

    }

    return true;
  }
}

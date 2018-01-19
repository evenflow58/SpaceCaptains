import { appVariables } from '../app.constants';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { Router } from '@angular/router/';

@Injectable()
export class CanActivateService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate() {
    let token = localStorage.getItem(appVariables.token);

    if (token) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }
}

import { AuthService } from '../services/api/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;

  public password: string;

  constructor(
    private authService: AuthService
  ) {

  }

  ngOnInit() {
  }

  login(username: string, password: string) {
    this.authService.login(username, password)
      .subscribe((result) => {
        debugger;
      });
  }
}

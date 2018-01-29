import { GoogleSignInSuccess } from 'angular-google-signin';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;

  public password: string;

  private googleClientId: string = environment.googleClientId;

  constructor(
    private userService: UserService
  ) {

  }

  ngOnInit() {

  }

  gLogin() {

  }

  login(username: string, password: string) {
    // this.authService.login(username, password)
    //   .subscribe((result) => {
    //     debugger;
    //   });
  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();

    this.userService.get(id).subscribe(user => {
      debugger;
      if (user.id === null) {
        // create user here.
      }
    });

    // Remove this when done
    gapi.auth2.getAuthInstance().signOut();
  }
}

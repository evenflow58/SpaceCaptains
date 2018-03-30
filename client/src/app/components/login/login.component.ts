import { CookieService } from 'ngx-cookie';
import { GoogleSignInSuccess } from 'angular-google-signin';
import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment.prod';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private googleClientId: string = environment.googleClientId;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private zone: NgZone
  ) {

  }

  ngOnInit() {

  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();

    this.authService.login(googleUser.getAuthResponse().id_token)
      .subscribe(response => {
        this.cookieService.put('token', response.token);
        // https://stackoverflow.com/questions/35936535/angular-2-ngoninit-not-called
        this.zone.run(() => this.router.navigate(['/dashboard']));
      });
  }
}

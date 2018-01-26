import { CanActivateService } from './guards/can-activate.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './signup/signup/signup.component';
import { GoogleSignInComponent } from 'angular-google-signin';
import { UserService } from './services/user/user.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    canActivate: [
      CanActivateService
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SignupComponent,
    GoogleSignInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    AppRoutingModule
  ],
  providers: [
    ApiService,
    UserService,
    CanActivateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

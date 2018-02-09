import { CookieModule } from 'ngx-cookie';
import { CanActivateService } from './guards/can-activate.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatListModule, MatDialogModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { GoogleSignInComponent } from 'angular-google-signin';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth/auth.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GameService } from './services/game/game.service';
import { NewGameWindowComponent } from './components/new-game-window/new-game-window.component';
import { GameBoardComponent } from './components/game-board/game-board.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    GoogleSignInComponent,
    DashboardComponent,
    NewGameWindowComponent,
    GameBoardComponent
  ],
  entryComponents: [
    NewGameWindowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [
    ApiService,
    AuthService,
    UserService,
    GameService,
    CanActivateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

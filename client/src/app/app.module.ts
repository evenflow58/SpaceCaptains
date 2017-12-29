import { CanActivateService } from './guards/can-activate.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/api/auth.service';
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
    MainComponent
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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    ApiService,
    AuthService,
    CanActivateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

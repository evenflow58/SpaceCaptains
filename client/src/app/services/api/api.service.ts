import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}${url}`, body, { headers: this.createHeaders() });
  }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}${url}`, { headers: this.createHeaders() });
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `bearer ${this.cookieService.get('token')}`);
  }
}
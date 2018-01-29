import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public post(url: string, body: any) {
    return this.http.post(`${environment.apiUrl}${url}`, body, { headers: this.createHeaders() });
  }

  public get(url: string): Observable<object> {
    return this.http.get(`${environment.apiUrl}${url}`, { headers: this.createHeaders() });
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json');
  }
}
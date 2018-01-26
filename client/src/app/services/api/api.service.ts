import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  public post(url: string, body: any) {
    return this.http.post(`${environment.apiUrl}${url}`, body, { headers: this.createHeaders() });
  }

  public get(url: string) {
    debugger;
    return this.http.get(`${environment.apiUrl}${url}`, { headers: this.createHeaders() })
      .subscribe(data => {
        console.log(data);
        debugger;
      });
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json');
  }
}
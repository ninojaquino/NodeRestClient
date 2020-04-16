import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiURL = ''; // http://localhost:3002/api/v1
  constructor(
    private http: Http
  ) {
    this.apiURL = environment.apiURL;
  }

  testing() {
    console.log('from http service testing..........');
  }

  // get('book');
  async get(path: string) {
    const resp = await this.http.get(this.apiURL + path, this.headers).toPromise();
    console.log('response from the http service get () resp: ', resp.json());
    return resp.json();
  }

  // post('book',{name: 'Twilight', isbn: '123456789'});
  async post(path: string, payload: any) {
    const resp = await this.http.post(this.apiURL + path, payload, this.headers).toPromise();
    console.log('from http service post() resp: ', resp.json());
    return resp.json();
  }

  // put('book/id/7', {name: The Hunger Games, isbn: 987654321, Author: Suzanne Collins, Description: Book of The Hunger Games})
  async put(path: string, payload: any) {
    const resp = await this.http.put(this.apiURL + path, payload, this.headers).toPromise();
    console.log('from http service put() resp: ', resp.json());
    return resp.json();

  }

  // delete ('book/id/10');
  async delete(path: string) {
    const resp = await this.http.delete(this.apiURL + path, this.headers).toPromise();
    console.log('from http service delete()', resp.json());
    return resp.json();
  }

  // logout();
  async logout() {
    const resp = await this.http.get(this.apiURL + 'user/logout', this.headers).toPromise();
    console.log('from http service logout()', resp.json());
    return resp.json();
  }

  get headers() {
    const token = localStorage.getItem('id_token') || null;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    if (token) {
      headers.append('Authorization', 'Bearer ' + token);
    }
    return {
      headers,
      withCredentials: true
    };
  }
}

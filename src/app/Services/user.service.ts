import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiUrl = 'https://localhost:7159/api/Login/CheckUsername';

  constructor(private http: HttpClient) {}

  checkUsernameAvailability(username: string): Observable<boolean> {
    const url = `${this.apiUrl}?username=${username}`;
    return this.http.get<boolean>(url);
  }
}

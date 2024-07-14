import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'https://localhost:7159/api/Login/CheckUsername';
  isAvailable:boolean = true;
  constructor(private http: HttpClient) {}

  checkUsernameAvailability(username: string): Observable<boolean> {
    console.log("Service");
    const url = `${this.apiUrl}?username=${username}`;
    return this.http.get<boolean>(url)
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private CheckUserApi = 'https://localhost:7159/api/Login/CheckUsername';
  private registerUserApi = 'https://localhost:7159/api/Login/Register';
  isAvailable:boolean = true;
  constructor(private http: HttpClient) {}

  checkUsernameAvailability(username: string): Observable<boolean> {
    console.log("Service");
    const url = `${this.CheckUserApi}?username=${username}`;
    return this.http.get<boolean>(url)
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.registerUserApi, user);
  }}
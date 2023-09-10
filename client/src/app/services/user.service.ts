import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserCreate } from '../types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private token: string = "";
  private authenticatedSub = new Subject<boolean>();
  private isAuthenticated = false;
  private logoutTimer: any;

  getIsAuthenticated(){
    return this.isAuthenticated;
  }

  getAuthenticatedSub(){
    return this.authenticatedSub.asObservable();
  }

  getToken(){
    return this.token;
  }

  constructor(private http: HttpClient, private router: Router) {}

  register(user: UserCreate){
    this.http.post(
      "/api/register/", user
    ).subscribe(res => {
      console.log(res);
    });
  }

  login(user: UserCreate){
    this.http.post<{token : string, expiresIn: number}>(
      "/api/login/", user
    ).subscribe((res: {token : string, expiresIn: number}) => {
      this.token = res.token;
      if(this.token){
        this.authenticatedSub.next(true);
        this.isAuthenticated = true;
        this.router.navigate(['/']);
        this.logoutTimer = setTimeout(() => {this.logout()}, res.expiresIn * 1000)
        const now = new Date();
        const expiresDate = new Date(now.getTime() + (res.expiresIn * 1000));
        this.storeLoginDetails(this.token, expiresDate);
      }
    });
  }

  logout(){
    this.token = '';
    this.isAuthenticated = false;
    this.authenticatedSub.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.logoutTimer);
    this.clearLoginDetails();
  }

  storeLoginDetails(token: string, expirationDate: Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expirationDate.toISOString());
  }

  clearLoginDetails(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  getLocalStorageData(){
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if(!token || !expiresIn){
      return;
    }

    return { token, 'expiresIn': new Date(expiresIn) };
  }

  authenticateFromLocalStorage(){
    const localStorageData = this.getLocalStorageData();

    if(localStorageData){
      const now = new Date();
      const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

      if(expiresIn > 0){
        this.token = localStorageData.token;
        this.authenticatedSub.next(true);
        this.isAuthenticated = true;
        this.logoutTimer.setTimeout(expiresIn / 1000);
      }
    }

  }

}

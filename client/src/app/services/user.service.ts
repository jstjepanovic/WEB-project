import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserCreate, UserGet } from '../types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private token: string = "";
  private authenticatedSub = new Subject<boolean>();
  private isAuthenticated = false;
  private logoutTimer: any;
  private tokenSubject = new BehaviorSubject<string>('');

  private readonly url = "https://board-frenzy.onrender.com/api";

  getIsAuthenticated(){
    return this.isAuthenticated;
  }

  getAuthenticatedSub(){
    return this.authenticatedSub.asObservable();
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getToken() {
    return this.tokenSubject.value;
  }

  getTokenChanges() {
    return this.tokenSubject.asObservable();
  }


  constructor(private http: HttpClient, private router: Router) {}

  getUser(userId: string){
    return this.http.get<UserGet>(`${this.url}/user/${userId}`);
  }

  uploadAvatar(userId: String, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('avatar', file);

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this.http.post(`${this.url}/upload-avatar/${userId}`, formData, { headers });
  }

  register(user: UserCreate){
    this.http.post(
      `${this.url}/register/`, user
    ).subscribe(res => {
      console.log(res);
    });
  }

  login(user: UserCreate){
    this.http.post<{token : string, expiresIn: number}>(
      `${this.url}/login/`, user
    ).subscribe((res: {token : string, expiresIn: number}) => {
      this.token = res.token;
      this.setToken(res.token)
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
    this.setToken('');
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
        this.setToken(localStorageData.token);
        this.authenticatedSub.next(true);
        this.isAuthenticated = true;
        this.logoutTimer.setTimeout(expiresIn / 1000);
      }
    }

  }

}

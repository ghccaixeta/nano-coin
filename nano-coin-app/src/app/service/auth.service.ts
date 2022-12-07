import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../login/model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  getToken(){
    const tokenString = localStorage.getItem('access_token')
    
    if(tokenString){
      const token = JSON.parse(tokenString).token
      return token
    }
    return null
  }
  

  isAuthenticated():boolean{
    const token = this.getToken()
    
    if(token){
      const isTokenExpired = this.jwtHelper.isTokenExpired(token)
      return !isTokenExpired;
    }
    return false
  }

  login(login: Login) : Observable<any>{
    
  
    const headers = {
      
    }
    return this.http.post(environment.apiUrl+'/auth/login?', login, {headers}).pipe(timeout(5000))

  }

  logout(){
    localStorage.removeItem('access_token');
  }

  getUser(){
    const token = this.getToken()
    if(token){
      const username = this.jwtHelper.decodeToken(token).login;
      return username;
    }
    return null;
  }

  getUserId(){
    const token = this.getToken()
    if(token){
      const id = this.jwtHelper.decodeToken(token).id;
      return id;
    }
    return null;
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  , BehaviorSubject } from 'rxjs';
import { RegisterRequest } from './register-request';
import { LoginRequest } from './login-request';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData= new BehaviorSubject(null);

  saveUserData() {
    let enCodedToken = JSON.stringify(localStorage.getItem('usertoken'));
    let decodedtoken :any = jwtDecode(enCodedToken);
    this.userData.next(decodedtoken); 
    console.log(this.userData) ; 

  }
  constructor(public http: HttpClient , private _Router : Router) {
    if(localStorage.getItem('usertoken') != null) {

      this.saveUserData();
    }
   }

  SignUp(registerData: RegisterRequest): Observable<any> {
    return this.http.post('https://routeegypt.herokuapp.com/signup', registerData)
  }


  Login(LoginData: LoginRequest): Observable<any> {
    return this.http.post('https://routeegypt.herokuapp.com/signin', LoginData)
  }



}

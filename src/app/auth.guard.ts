import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MainServeicesService } from './main-serveices.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private _MainServeicesService : MainServeicesService , private _Router : Router) {
   
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     if(this._MainServeicesService.userData.getValue() != null) {
      return true ; 
     }
     else {
      this._Router.navigateByUrl('/login');
      return false ; 
     }
  }
  
}

import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServeicesService } from '../main-serveices.service';
HostListener
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean = false;
 


  constructor(private _Router: Router, private _MainServeicesService: MainServeicesService) { 
  
  }
  navbarfixed : boolean = false ; 
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if(window.scrollY > 70 )
     {
      this.navbarfixed = true ; 
     }
     else {
      this.navbarfixed = false ; 
     }

  }
  ngOnInit(): void {
    this.getData() ;
    this._MainServeicesService.userData.subscribe({
      next: () => {
        if (this._MainServeicesService.userData.getValue() != null) {
          this.isLogin = true;
        }
        else {
          this.isLogin = false;
        }
      }
    })

  }
  profileData : any = {} ; 
  getData() {
    this._MainServeicesService.GetProfileData().subscribe(
      (data) => {
        this.profileData = data;
        console.log(this.profileData);
    
        
      }
    )
  }
  LogOut() {
    this.isLogin = false;
    this._MainServeicesService.SignOut();

  }


}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../authentication.service';
import { MainServeicesService } from '../main-serveices.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router, private _MainServeicesService: MainServeicesService, private _NgxSpinnerService: NgxSpinnerService  , private _ToastrService : ToastrService) { }


  LoginForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required])

  })
  errmasgae :string = " " ; 
  Login() {
    this._NgxSpinnerService.show();
    this._MainServeicesService.login(this.LoginForm.value).subscribe((data) => {
      localStorage.setItem("Role", data.roles)
      localStorage.setItem("UserID", data.userId)
      localStorage.setItem("Token", data.token)
      localStorage.setItem("Name", data.userName)
      localStorage.setItem("Email", data.email)
      this._ToastrService.success('مرحبا بك في موقع رؤيه!');
      this._MainServeicesService.saveUserData();
      this._Router.navigateByUrl('/home');
    }, 
    (err)=>{
      this.errmasgae = err.error.errorMsg
      this._ToastrService.error(this.errmasgae);
    }
    );
   
  }
  ngOnInit(): void {
  }
}


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';
import { MainServeicesService } from '../main-serveices.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    'Name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    'City': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    'Country': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    'PhoneNumper': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    'Email': new FormControl(null, [Validators.required, Validators.email]),
    'Password': new FormControl(null),
    'role' : new FormControl(null)
  })


  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router , private _MainServeicesService : MainServeicesService , private _ToastrService : ToastrService) { }
  ngOnInit(): void {
  }
  file: any;
  Error: any
  handelimage(e: any) {
    this.file = e.target.files
    console.log(this.file[0]);
  }
  errmasgae :string = " "; 
  handelSubmit() {
    if (this.file != null) {
      let formData = new FormData()
      formData.append("Email", this.registerForm.controls['Email'].value)
      formData.append("Name", this.registerForm.controls['Name'].value)
      formData.append("Password", this.registerForm.controls['Password'].value)
      formData.append("City", this.registerForm.controls['City'].value)
      formData.append("Country", this.registerForm.controls['Country'].value)
      formData.append("PhoneNumper", this.registerForm.controls['PhoneNumper'].value)
      formData.append("imgNmae", this.file[0])
      console.log(formData);
      this._MainServeicesService.RegisterAsUserBuyer(formData , this.registerForm.controls['role'].value ).subscribe(
        (res) => {
          window.location.href = '/login'
          console.log(res);
        }, 
        (err)=>{
          this.errmasgae = err.error.errorMsg
          this._ToastrService.error(this.errmasgae);
        }
        );
        
    } 
  }
  
}


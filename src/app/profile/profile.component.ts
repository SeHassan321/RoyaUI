import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainServeicesService } from '../main-serveices.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _MainServeicesService: MainServeicesService, private _ToastrService: ToastrService) { }
  userId: any = localStorage.getItem("UserID");
  isFavourotList = false;
  isProfile: boolean = false;
  isBooking: boolean = false;
  isAddProdct: boolean = false;
  ngOnInit(): void {
    this.getData();
  }


  favourtList() {
    this.isFavourotList = true;
    this.isProfile = false;
    this.isBooking = false;
    this.isAddProdct = false;

  }
  Booking() {
    this.isFavourotList = false;
    this.isProfile = false;
    this.isBooking = true;
    this.isAddProdct = false;

  }
  MainData() {
    this.isFavourotList = false;
    this.isProfile = true;
    this.isBooking = false;
    this.isAddProdct = false;
  }
  AddProduct() {
    this.isFavourotList = false;
    this.isProfile = false;
    this.isBooking = false;
    this.isAddProdct = true;
  }
  addHotelForm: FormGroup = new FormGroup({
    Name: new FormControl(null, [Validators.required]),
    Description: new FormControl(null, [Validators.required]),
    Type: new FormControl(null, [Validators.required]),
    Price: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),

    UserId: new FormControl(null, [Validators.required]),
    ImagesFile: new FormControl(null, [Validators.required]),

  });
  maultimages: any = {};
  handelimage(e: any) {
    this.maultimages = e.target.files

    if (this.maultimages.length <= 4) {
      for (let img of this.maultimages) {
        if (img.size > 500000) {
          {
            alert(`5KP أكبر من  ${img.name}  الصورة`);
          }
          this.addHotelForm.controls["image"].setValue(null);
        }

      }
    }
    else {
      alert('يجب ادخال اربع  صور فقط')
      this.addHotelForm.controls["image"].setValue(null);

    }
  }

  // get id to make update and delete
  productIdBeforDeleted: any;
  Productdetailes: any;

  nameOFProductYouWillDelete: any;
  getId(id: any, nameOFProductYouWillDelete: any) {
    this.nameOFProductYouWillDelete = nameOFProductYouWillDelete;

    this.productIdBeforDeleted = id;
    // get hotel data
    this._MainServeicesService
      .GetProductById(this.productIdBeforDeleted)
      .subscribe((res) => {
        this.Productdetailes = res;
        this.setValueInInputUpdate();
      });

  }
  //update model sit value in inputs
  setValueInInputUpdate() {
    // set data in input model update
    this.addHotelForm.controls.Name.setValue(
      this.Productdetailes?.name
    );
    this.addHotelForm.controls.Description.setValue(
      this.Productdetailes?.description
    );
    this.addHotelForm.controls.Type.setValue(
      this.Productdetailes?.type
    );
    this.addHotelForm.controls.Price.setValue(
      this.Productdetailes?.price
    );
    this.addHotelForm.controls.address.setValue(this.Productdetailes?.address);


  }

  // submit your data

  handelSubmit(e: any) {
    if (this.maultimages != null) {
      let formData = new FormData();

      formData.append(
        "Name",
        this.addHotelForm.controls["Name"].value
      );
      formData.append(
        "Description",
        this.addHotelForm.controls["Description"].value
      );
      formData.append(
        "Type",
        this.addHotelForm.controls["Type"].value
      );
      formData.append(
        "Type",
        this.addHotelForm.controls["Type"].value
      );
      formData.append("Price", this.addHotelForm.controls["Price"].value);
      formData.append("address", this.addHotelForm.controls["address"].value);
      formData.append("UserId", this.userId);
      for (let img of this.maultimages)

        formData.append("ImagesFile", img);
      if (this.productIdBeforDeleted > 0) {
        this._MainServeicesService.updateProduct(formData, this.productIdBeforDeleted).subscribe((res) => {
          this.addHotelForm.reset();
          this.maultimages = null
          this._ToastrService.success('تم تعديل المنتج بنجاح');

          this.getData();

        });
      } else {
        this._MainServeicesService.AddProduct(formData).subscribe((res) => {
          this.addHotelForm.reset();
          this.maultimages = null
          this._ToastrService.success('تم أضافه المنتج بنجاح');
          this.getData();
        });
      }

    }
  }
  profileData: any = {};
  UserProducts: any[] = [];
  UserFavourotList: any[] = [];
  UserBooking: any[] = [];
  role: string = '';

  roleSatus: boolean = true;
  getData() {
    this._MainServeicesService.GetProfileData().subscribe(
      (data) => {
        this.profileData = data;
        this.role = data.role;
        this.UserProducts = data.products;
        this.UserBooking = data.bookings;
        this.UserFavourotList = data.favoritLists;
        console.log(this.profileData);

        if (this.role == 'Client') {
          this.roleSatus = false;
        }
        else {
          this.roleSatus = true;
        }
      }
    )
  }

  DeleteFav(id: any) {
    this._MainServeicesService.DeleteFavouritList(id).subscribe(() => {
      this._ToastrService.success("تم حذف العقار بنجاح");
      this.favourtList();
      location.reload();

    })


   


  }
  DeleteBooking(id: any) {
    this._MainServeicesService.deleteBook(id).subscribe(() => {
      this._ToastrService.success("تم حذف العقار بنجاح");
      this.Booking();
      location.reload();
    })
   
 

  }

  ViewProduct(product: any) {
    this._MainServeicesService.ViewProduct(product);
  }
  deleteProduct(id: any) {
    this._MainServeicesService.deleteProduct(id).subscribe(
      (res) => {
        this._ToastrService.success("تم الحذف العقار بنجاح");
        location.reload();
      },
      (err) => { },
      () => { }
    );

    this.getData();

  }
}




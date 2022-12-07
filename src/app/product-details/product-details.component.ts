import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainServeicesService } from '../main-serveices.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  currentId: number = 0;
  ProductDetails: any = {};
  userId: any = localStorage.getItem("UserID");
  userName: any = localStorage.getItem("Name");
  userImage: any = localStorage.getItem("UserImage");
  Email: any = localStorage.getItem("UserEmail");

  constructor(private _MainServeicesService: MainServeicesService, private _ActivatedRoute: ActivatedRoute, private _ToastrService: ToastrService) {
    this.currentId = this._ActivatedRoute.snapshot.params.id;
  }
  GetProductByID() {

    this._MainServeicesService.GetProductById(this.currentId).subscribe((data) => {

      this.ProductDetails = data;
      console.log(data);

    })
  }
  errmasgae: string = "";
  addProductToFavouritList() {
    let Object = {
      userId: this.userId,
      productId: this.ProductDetails.id
    }

    this._MainServeicesService.AddProductToFavoritList(Object).subscribe((data) => {
      this._ToastrService.success("تمت اضافه العقار الى المفضله");

    },
      (err) => {
        this.errmasgae = err.error.errorMsg


        this._ToastrService.error(this.errmasgae);

      });

  }
  AddProductToBooking() {
    let formData = new FormData();
    formData.append("UserId", this.userId);
    formData.append("UserEmail", this.Email);
    formData.append("userName", this.userName);
    formData.append("ProductId", this.ProductDetails.id);
    formData.append("ProductName", this.ProductDetails.name);
    formData.append("Image", this.ProductDetails?.images[0]);
    this._MainServeicesService.AddProductToBooking(formData).subscribe((data) => {
      console.log(data);
    });
    this._ToastrService.success('تم حجز المنتج بنجاح');


  }
  CommnetForm: FormGroup = new FormGroup({
    text: new FormControl(null),
  })
  AddCommentToProduct() {
    let Object = {
      text: this.CommnetForm.controls['text'].value,
      userName: this.userName,
      userImage: this.userImage,
      productId: this.ProductDetails.id
    }
    this._MainServeicesService.AddCommentToProduct(Object).subscribe((data) => {
      this._ToastrService.success("تم اضافه المنتج بنجاح");
      this.CommnetForm.reset();
      location.reload();
    });
  }
  ngOnInit(): void {
    this.GetProductByID();
  }
}



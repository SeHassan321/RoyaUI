import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MainServeicesService } from '../main-serveices.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private _MainServeicesService: MainServeicesService) { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  ngOnInit() {
    this.spinner.show();
    this.getProduct();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);

  }
  term : string = "" ;
  productList: any[] = [];
  Comments: any[] = [];
  images: any[] = [];

  getProduct() {
    return this._MainServeicesService.GetAllProduct().subscribe((data) => {
      console.log(data) ; 
      this.productList = data.data;
      this.productList = data.data;
      this.Comments = data.data.comments;
      this.images = data.data.images;
      console.log(this.productList);
      console.log(this.images);
     

    })
  }
}

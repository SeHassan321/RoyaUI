import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainServeicesService {
  baseUrl: string = "http://royaiti-001-site1.gtempurl.com";
  //baseUrl: string = "https://localhost:7272";
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('Token') != null) {
      this.saveUserData();
    }
  }
  RegisterAsUserBuyer(body: any, role: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/Accouent/${role}`, body);
  }
  login(body: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/Accouent/login`, body);
  }
  SignOut() {
    localStorage.removeItem("Token");
    localStorage.removeItem("Name");
    localStorage.removeItem("Role");
    localStorage.removeItem("UserID");   
    
    this._Router.navigateByUrl('/login');
  }
  userData = new BehaviorSubject(null);
  saveUserData() {
    let enCodedToken = JSON.stringify(localStorage.getItem('Token'));
    let decodedtoken: any = jwtDecode(enCodedToken);
    this.userData.next(decodedtoken);
    console.log(this.userData);
  }
  GetProfileData(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/Accouent`);
  }
  GetProductById(id: number): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/Product/${id}`);
  }
  GetAllProduct(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}​/api/Product`);
  }
  AddProduct(body: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/Product`, body);
  }
  AddProductToFavoritList(body: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/FavouriteList`, body);
  }
  AddProductToBooking(body: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/Booking`, body);
  }

  DeleteFavouritList(body: any): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/FavouriteList?id=${body}`);
  }

  deleteBook(id: any): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/Booking/${id}`);
  }
  updateProduct(body: any, id: number): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/api/Product/${id}`, body);
  }
  deleteProduct(id: any): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/Product/${id}`);
  }
  AddCommentToProduct(body : any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/Product/addComment` , body);
  }

  public ItemCart: any[] = [];
  public ListOfProduct = new BehaviorSubject<any>([]);
  ViewProduct(product: any) {
    this.ItemCart.push(product);
    this.ListOfProduct.next(this.ItemCart);
  }
  getTheProduct() {
    return this.ListOfProduct.asObservable();
  }
}

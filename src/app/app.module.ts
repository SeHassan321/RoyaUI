import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {  CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { ProfileComponent } from './profile/profile.component';
import { LoginInterceptorInterceptor } from './login-interceptor.interceptor';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchPipe } from './search.pipe';
HttpClientModule
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProductDetailsComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    NgbModule,
    ReactiveFormsModule , 
    FormsModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule, 
    HttpClientModule , 
    FormsModule, 
    ToastrModule.forRoot()

  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide : HTTP_INTERCEPTORS , 
      useClass : LoginInterceptorInterceptor , 
      multi : true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

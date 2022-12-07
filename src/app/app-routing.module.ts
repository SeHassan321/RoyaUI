import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';




const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path : 'home' , component : HomeComponent},
  {path : 'about' ,  component : AboutComponent},
  {path : 'login' ,  component : LoginComponent},
  {path : 'register'  , component : RegisterComponent},
  {path : 'profile' , canActivate:[AuthGuard], component : ProfileComponent},
  {path : 'ProductDetails/:id' , component : ProductDetailsComponent},
 



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

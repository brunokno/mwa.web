import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Route
import { AppRouting } from './app.routing';

//Components
import { AppComponent } from './app.component';

//Shared
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeadbarComponent } from './components/shared/headbar/headbar.component';
import { SubMenuComponent } from './components/shared/sub-menu/sub-menu.component';

//Pages
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';

import { NumberDirective } from './directives/number.directive';
import { RegisterBuyPageComponent } from './pages/register-buy-page/register-buy-page.component';


@NgModule({
  declarations: [
    NumberDirective,
    AppComponent,
    FooterComponent,
    HeadbarComponent,
    SubMenuComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    CartPageComponent,
    ProductListComponent,
    MyProfileComponent,
    RegisterPageComponent,
    RegisterBuyPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [CartService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

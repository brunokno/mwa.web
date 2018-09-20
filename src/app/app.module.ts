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
import { FormDebugComponent } from './components/shared/form-debug/form-debug-component';
import { ErrorMsgComponent } from './components/shared/error-msg/error-msg.component';
import { CampoControlErroComponent } from './components/shared/campo-control-erro/campo-control-erro.component';

//Pages
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterBuyPageComponent } from './pages/register-buy-page/register-buy-page.component';
import { MarkupPageComponent } from './pages/markup-page/markup-page.component';

//Services
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { InterceptService} from './services/intercept.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Directives
import { NumberDirective } from './directives/number.directive';

import { TextMaskModule } from 'angular2-text-mask';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { InternalServerErrorComponent } from './errors/internal-server-error/internal-server-error.component';
import { ServiceUnavailableComponent } from './errors/service-unavailable/service-unavailable.component';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';




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
    RegisterBuyPageComponent,
    MarkupPageComponent,
    FormDebugComponent,
    ErrorMsgComponent,
    CampoControlErroComponent,
    NotFoundComponent,
    InternalServerErrorComponent,
    ServiceUnavailableComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouting,
    TextMaskModule,
    HttpClientModule
  ],
  providers: [
    CartService, 
    AuthService,
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

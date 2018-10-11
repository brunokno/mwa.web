import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterBuyPageComponent } from './pages/register-buy-page/register-buy-page.component';
import { MarkupPageComponent } from './pages/markup-page/markup-page.component';
import { MyPageComponent } from './pages/my-page/my-page.component';

import { AuthService } from './services/auth.service';
import { ServiceUnavailableComponent } from './errors/service-unavailable/service-unavailable.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { InternalServerErrorComponent } from './errors/internal-server-error/internal-server-error.component';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { DragComponent } from './components/drag/drag.component';
import { PaymentStepsComponent } from './components/payment-steps/payment-steps.component';
import { CartSucessComponent } from './components/cart-sucess/cart-sucess.component';
import { FormArrayPageComponent } from './pages/form-array-page/form-array-page.component';


const appRoutes : Routes=[
    {path:'', component: LoginPageComponent},
    {path:'home', canActivate:[AuthService], component: HomePageComponent},
    {path:'signup', component:SignupPageComponent},
    {path:'cart', canActivate:[AuthService], component:CartPageComponent},
    {path:'profile', canActivate:[AuthService], component:MyProfileComponent},
    {path:'register',component:RegisterPageComponent},
    {path:'registerbuy', canActivate:[AuthService], component:RegisterBuyPageComponent},
    {path:'markup', canActivate:[AuthService], component:MarkupPageComponent},
    {path:'mypage', canActivate:[AuthService], component:MyPageComponent},
    {path:'formArray', canActivate:[AuthService], component:FormArrayPageComponent},
    {path:'serviceunavailable', component: ServiceUnavailableComponent},
    {path:'notfound', component: NotFoundComponent},
    {path:'internalservererror', component: InternalServerErrorComponent},
    {path:'unauthorized', component: UnauthorizedComponent},
    {path:'drag', component: DragComponent},
    {path:'payment-step', component:PaymentStepsComponent},
    {path:'cart-success', component:CartSucessComponent}
];

//export const RouterProviders: any[] = [];
//export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class AppRouting{
    
}
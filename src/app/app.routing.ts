import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterBuyPageComponent } from './pages/register-buy-page/register-buy-page.component';

import { AuthService } from './services/auth.service';

const appRoutes : Routes=[
    {path:'', component: LoginPageComponent},
    {path:'home', canActivate:[AuthService], component: HomePageComponent},
    {path:'signup', component:SignupPageComponent},
    {path:'cart', canActivate:[AuthService], component:CartPageComponent},
    {path:'profile', canActivate:[AuthService], component:MyProfileComponent},
    {path:'register',component:RegisterPageComponent},
    {path:'registerbuy',component:RegisterBuyPageComponent}
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
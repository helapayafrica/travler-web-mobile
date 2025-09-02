import { Routes } from '@angular/router';
import { NotFound } from './views/not-found/not-found';
import {SignupComponent} from './views/Auth/sign-up/sign-up';
import {LoginComponent} from './views/Auth/login/login';
import {HomeComponent} from './views/home/home.component';
import {FAQSComponent} from './views/home/sections/faqs/faqs.component';
import {SearchComponent} from './views/search/search.component';
import {CheckoutComponent} from './views/checkout/checkout.component';
import {PaymentFormComponent} from './views/checkout/sections/payment-form/payment-form.component';



export const routes: Routes = [

  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path: 'home',
    component:HomeComponent
  },

  {
    path: 'sign-up',
    loadComponent: () => import('./views/Auth/sign-up/sign-up').then(m => m.SignupComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./views/Auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./views/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'faqs',
    loadComponent: () => import('./views/home/sections/faqs/faqs.component').then(m => m.FAQSComponent)
  },

  {
    path: 'checkout',
    loadComponent: () => import('./views/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'payment',
    loadComponent: () => import('./views/checkout/sections/payment-form/payment-form.component').then(m => m.PaymentFormComponent),
  },

    {
        path: '**',
        component : NotFound
    },


];

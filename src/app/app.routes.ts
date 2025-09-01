import { Routes } from '@angular/router';
import { NotFound } from './views/not-found/not-found';
import {SignupComponent} from './views/Auth/sign-up/sign-up';
import {LoginComponent} from './views/Auth/login/login';
import {HomeComponent} from './views/home/home.component';
import {FAQSComponent} from './views/home/sections/faqs/faqs.component';
import {SearchComponent} from './views/search/search.component';



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
        component: SignupComponent
    },
    {
        path: 'login',
        component:LoginComponent
    },
  {
    path:'search',
    component:SearchComponent
  },
  {
    path:'faqs',
    component:FAQSComponent
  },

    {
        path: '**',
        component : NotFound
    },


];

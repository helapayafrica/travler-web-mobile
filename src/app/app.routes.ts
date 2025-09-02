import { Routes } from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {UserProfileLayoutComponent} from './views/user-profile/user-profile-layout.component';
import {DashboardComponent} from './views/user-profile/dashboard/dashboard.component';
import {BookingsComponent} from './views/user-profile/bookings/bookings.component';
import {WalletComponent} from './views/user-profile/wallet/wallet.component';
import {AccountDetailsComponent} from './views/user-profile/account-details/account-details.component';
import {ChangePasswordComponent} from './views/user-profile/change-password/change-password.component';
import {UserListComponent} from './views/user-profile/user-list/user-list.component';
import {TicketComponent} from './views/ticket/ticket.component';



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
    path: 'user-profile',
    component: UserProfileLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'bookings',
        component: BookingsComponent
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'account',
        component: AccountDetailsComponent
      },
      {
        path: 'ticket',
        component: TicketComponent
      },




      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'user-list',
        component: UserListComponent
      }
    ]
  },


    {
        path: '**',
        component : PageNotFoundComponent
    },
];

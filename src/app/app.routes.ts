import { Routes } from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';

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
    path: 'contact',
    loadComponent: () => import('./contactus/contactus.component').then(m => m.ContactusComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./aboutus/aboutus.component').then(m => m.AboutusComponent)
  },
  {
    path: 'ticket',
    loadComponent: () => import('./views/ticket/ticket.component').then(m => m.TicketComponent)
  },
  {
    path: 'support',
    loadComponent: () => import('./support/support.component').then(m => m.SupportComponent)
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./views/user-profile/user-profile-layout.component').then(m => m.UserProfileLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./views/user-profile/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'bookings',
        loadComponent: () => import('./views/user-profile/bookings/bookings.component').then(m => m.BookingsComponent)
      },
      {
        path: 'wallet',
        loadComponent: () => import('./views/user-profile/wallet/wallet.component').then(m => m.WalletComponent)
      },
      {
        path: 'account',
        loadComponent: () => import('./views/user-profile/account-details/account-details.component').then(m => m.AccountDetailsComponent)
      },
      {
        path: 'change-password',
        loadComponent: () => import('./views/user-profile/change-password/change-password.component').then(m => m.ChangePasswordComponent)
      },
      {
        path: 'user-list',
        loadComponent: () => import('./views/user-profile/user-list/user-list.component').then(m => m.UserListComponent)
      }
    ]
  },

    {
        path: '**',
        component : PageNotFoundComponent
    },
];

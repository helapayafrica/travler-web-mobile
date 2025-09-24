import {Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {Feedback} from './views/feedback/feedback';
import {SpinTheWheel} from './views/spin-the-wheel/spin-the-wheel';
import {authGuard} from './utils/auth-guard';
import {PaymentConfirmationComponent} from './views/payment-confirmation-component/payment-confirmation-component';
import {TripFeedbackForm} from './views/trip-feedback-form/trip-feedback-form';
import {PaymentVerification} from './views/payment-verification/payment-verification';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home | Cheap bus ticket Kenya',
    data: {
      description: 'Welcome to Traveler - Your trusted platform for travel bookings'
    }
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./views/Auth/sign-up/sign-up').then(m => m.SignupComponent),
    title: 'Sign Up | Cheap bus ticket Kenya',
    data: {
      description: 'Create your Traveler account to start booking travel services'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/Auth/login/login').then(m => m.LoginComponent),
    title: 'Login | Cheap bus ticket Kenya',
    data: {
      description: 'Sign in to your Traveler account'
    }
  },
  {
    path: 'search',
    loadComponent: () => import('./views/search/search.component').then(m => m.SearchComponent),
    title: 'Search | Cheap bus ticket Kenya',
    data: {
      description: 'Search for travel options and services'
    }
  },
  {
    path: 'faqs',
    loadComponent: () => import('./views/home/sections/faqs/faqs.component').then(m => m.FAQSComponent),
    title: 'FAQs | Cheap bus ticket Kenya',
    data: {
      description: 'Frequently Asked Questions about Traveler services'
    }
  },
  {
    path: 'checkout',
    loadComponent: () => import('./views/checkout/checkout.component').then(m => m.CheckoutComponent),
    title: 'Checkout | Cheap bus ticket Kenya',
    data: {
      description: 'Complete your booking payment'
    }
  },
  {
    path: 'payment',
    loadComponent: () => import('./views/checkout/sections/payment-form/payment-form.component').then(m => m.PaymentFormComponent),
    title: 'Payment | Cheap bus ticket Kenya',
    data: {
      description: 'Secure payment processing'
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./views/contactus/contactus.component').then(m => m.ContactusComponent),
    title: 'Contact Us | Cheap bus ticket Kenya',
    data: {
      description: 'Get in touch with our support team'
    }
  },
  {
    path: 'terms',
    loadComponent: () => import('./views/terms/terms').then(m => m.Terms),
    title: 'Terms | Cheap bus ticket Kenya',
    data: {
      description: 'Terms and conditions for using Traveler services'
    }
  },
    {
    path: 'privacy',
    loadComponent: () => import('./views/privacy/privacy').then(m => m.Privacy),
    title: 'Privacy | Cheap bus ticket Kenya',
    data: {
      description: 'Privacy policy for Traveler services'
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./views/aboutus/aboutus.component').then(m => m.AboutusComponent),
    title: 'About Us | Cheap bus ticket Kenya',
    data: {
      description: 'Learn more about Traveler and our services'
    }
  },
  {
    path: 'ticket',
    loadComponent: () => import('./views/ticket/ticket.component').then(m => m.TicketComponent),
    title: 'Ticket | Cheap bus ticket Kenya',
    data: {
      description: 'View your travel ticket details'
    }
  },
  {
    path: 'support',
    loadComponent: () => import('./views/support/support.component').then(m => m.SupportComponent),
    title: 'Support | Cheap bus ticket Kenya',
    data: {
      description: 'Customer support and help center'
    }
  },
  {
    path: 'spin-to-win',
    loadComponent: () => import('./views/spin-the-wheel/spin-the-wheel').then(m => m.SpinTheWheel),
    title: 'Spin | Cheap bus ticket Kenya',
    data: {
      description: 'Customer support and help center'
    }
  },
  {
    path: 'feedback',
    loadComponent: () => import('./views/feedback/feedback').then(m => m.Feedback),
    title: 'Feedback | Cheap bus ticket Kenya',
    data: {
      description: 'Customer support and help center'
      }
  },
  {
    path: 'trip-feedback',
    component: TripFeedbackForm,
    title: 'Trip Feedback | Cheap bus ticket Kenya',
    data: {
      description: 'Customer support and help center'
    }
  },
  {
    path: 'confirm-payment',
  component: PaymentVerification,
    title: 'Confirm Payment | Cheap bus ticket Kenya',
    data: {
      description: 'Customer support and help center'
    }
  },
  {
    path: 'user-profile',
    canActivate: [authGuard],
    loadComponent: () => import('./views/user-profile/user-profile-layout.component').then(m => m.UserProfileLayoutComponent),
    title: 'Profile | Cheap bus ticket Kenya',
    data: {
      description: 'Manage your Traveler account'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./views/user-profile/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard | Cheap bus ticket Kenya',
        data: {
          description: 'Your Traveler account dashboard'
        }
      },
      {
        path: 'bookings',
        loadComponent: () => import('./views/user-profile/bookings/bookings.component').then(m => m.BookingsComponent),
        title: 'My Bookings | Cheap bus ticket Kenya',
        data: {
          description: 'View and manage your bookings'
        }
      },
      {
        path: 'wallet',
        loadComponent: () => import('./views/user-profile/wallet/wallet.component').then(m => m.WalletComponent),
        title: 'Wallet | Cheap bus ticket Kenya',
        data: {
          description: 'Manage your Traveler wallet'
        }
      },
      {
        path: 'account',
        loadComponent: () => import('./views/user-profile/account-details/account-details.component').then(m => m.AccountDetailsComponent),
        title: 'Account Details | Cheap bus ticket Kenya',
        data: {
          description: 'Manage your account information'
        }
      },
      {
        path: 'change-password',
        loadComponent: () => import('./views/user-profile/change-password/change-password.component').then(m => m.ChangePasswordComponent),
        title: 'Change Password | Cheap bus ticket Kenya',
        data: {
          description: 'Update your account password'
        }
      },
      {
        path: 'user-list',
        loadComponent: () => import('./views/user-profile/user-list/user-list.component').then(m => m.UserListComponent),
        title: 'User List | Cheap bus ticket Kenya',
        data: {
          description: 'View user list'
        }
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found | Cheap bus ticket Kenya',
    data: {
      description: 'The requested page could not be found'
    }
  },
];

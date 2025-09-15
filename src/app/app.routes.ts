import {Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home | Traveler',
    data: {
      description: 'Welcome to Traveler - Your trusted platform for travel bookings'
    }
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./views/Auth/sign-up/sign-up').then(m => m.SignupComponent),
    title: 'Sign Up | Traveler',
    data: {
      description: 'Create your Traveler account to start booking travel services'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/Auth/login/login').then(m => m.LoginComponent),
    title: 'Login | Traveler',
    data: {
      description: 'Sign in to your Traveler account'
    }
  },
  {
    path: 'search',
    loadComponent: () => import('./views/search/search.component').then(m => m.SearchComponent),
    title: 'Search | Traveler',
    data: {
      description: 'Search for travel options and services'
    }
  },
  {
    path: 'faqs',
    loadComponent: () => import('./views/home/sections/faqs/faqs.component').then(m => m.FAQSComponent),
    title: 'FAQs | Traveler',
    data: {
      description: 'Frequently Asked Questions about Traveler services'
    }
  },
  {
    path: 'checkout',
    loadComponent: () => import('./views/checkout/checkout.component').then(m => m.CheckoutComponent),
    title: 'Checkout | Traveler',
    data: {
      description: 'Complete your booking payment'
    }
  },
  {
    path: 'payment',
    loadComponent: () => import('./views/checkout/sections/payment-form/payment-form.component').then(m => m.PaymentFormComponent),
    title: 'Payment | Traveler',
    data: {
      description: 'Secure payment processing'
    }
  },
  {
    path: 'contact',
    loadComponent: () => import('./contactus/contactus.component').then(m => m.ContactusComponent),
    title: 'Contact Us | Traveler',
    data: {
      description: 'Get in touch with our support team'
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./aboutus/aboutus.component').then(m => m.AboutusComponent),
    title: 'About Us | Traveler',
    data: {
      description: 'Learn more about Traveler and our services'
    }
  },
  {
    path: 'ticket',
    loadComponent: () => import('./views/ticket/ticket.component').then(m => m.TicketComponent),
    title: 'Ticket | Traveler',
    data: {
      description: 'View your travel ticket details'
    }
  },
  {
    path: 'support',
    loadComponent: () => import('./support/support.component').then(m => m.SupportComponent),
    title: 'Support | Traveler',
    data: {
      description: 'Customer support and help center'
    }
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./views/user-profile/user-profile-layout.component').then(m => m.UserProfileLayoutComponent),
    title: 'Profile | Traveler',
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
        title: 'Dashboard | Traveler',
        data: {
          description: 'Your Traveler account dashboard'
        }
      },
      {
        path: 'bookings',
        loadComponent: () => import('./views/user-profile/bookings/bookings.component').then(m => m.BookingsComponent),
        title: 'My Bookings | Traveler',
        data: {
          description: 'View and manage your bookings'
        }
      },
      {
        path: 'wallet',
        loadComponent: () => import('./views/user-profile/wallet/wallet.component').then(m => m.WalletComponent),
        title: 'Wallet | Traveler',
        data: {
          description: 'Manage your Traveler wallet'
        }
      },
      {
        path: 'account',
        loadComponent: () => import('./views/user-profile/account-details/account-details.component').then(m => m.AccountDetailsComponent),
        title: 'Account Details | Traveler',
        data: {
          description: 'Manage your account information'
        }
      },
      {
        path: 'change-password',
        loadComponent: () => import('./views/user-profile/change-password/change-password.component').then(m => m.ChangePasswordComponent),
        title: 'Change Password | Traveler',
        data: {
          description: 'Update your account password'
        }
      },
      {
        path: 'user-list',
        loadComponent: () => import('./views/user-profile/user-list/user-list.component').then(m => m.UserListComponent),
        title: 'User List | Traveler',
        data: {
          description: 'View user list'
        }
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found | Traveler',
    data: {
      description: 'The requested page could not be found'
    }
  },
];

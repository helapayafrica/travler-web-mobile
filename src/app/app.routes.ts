import {Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {authGuard} from './utils/auth-guard';
import {TripFeedbackForm} from './views/trip-feedback-form/trip-feedback-form';
import {PaymentVerification} from './views/payment-verification/payment-verification';
import {ForgotPassword} from './views/Auth/forgot-password/forgot-password';
import {ResetPassword} from './views/Auth/reset-password/reset-password';
import {resetPasswordGuard} from './utils/reset-password-guard';
import {agentGuard} from './utils/agent-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home | East Africa\'s largest Booking Platform',
    data: {
      description: 'Welcome to Traveler - Your trusted platform for travel bookings',
    },
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./views/Auth/sign-up/sign-up').then((m) => m.SignupComponent),
    title: 'Sign Up | East Africa\'s largest Booking Platform',
    data: {
      description: 'Create your Traveler account to start booking travel services',
    },
  },
  {
    path: 'login',
    loadComponent: () => import('./views/Auth/login/login').then((m) => m.LoginComponent),
    title: 'Login | East Africa\'s largest Booking Platform',
    data: {
      description: 'Sign in to your Traveler account',
    },
  },
  {
    path: "forgot-password",
    loadComponent: () => import('./views/Auth/forgot-password/forgot-password').then((m)=> ForgotPassword),
    title :'Forgot Password | East Africa\'s largest Booking Platform',
    data: {
      description:  'Forgot Password'
    }

  },{
      path :"reset-password",
      canActivate: [resetPasswordGuard],
      loadComponent: () => import('./views/Auth/reset-password/reset-password').then((m) => ResetPassword),
      title :'Reset Password | East Africa\'s largest Booking Platform',
      data: {
        description:  'Reset Password'
      }
  },
  {
    path: 'search',
    loadComponent: () => import('./views/search/search.component').then((m) => m.SearchComponent),
    title: 'Search | East Africa\'s largest Booking Platform',
    data: {
      description: 'Search for travel options and services',
    },
  },
  {
    path: 'faqs',
    loadComponent: () =>
      import('./views/home/sections/faqs/faqs.component').then((m) => m.FAQSComponent),
    title: 'FAQs | East Africa\'s largest Booking Platform',
    data: {
      description: 'Frequently Asked Questions about Traveler services',
    },
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./views/checkout/checkout.component').then((m) => m.CheckoutComponent),
    title: 'Checkout | East Africa\'s largest Booking Platform',
    data: {
      description: 'Complete your booking payment',
    },
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./views/checkout/sections/payment-form/payment-form.component').then(
        (m) => m.PaymentFormComponent
      ),
    title: 'Payment | East Africa\'s largest Booking Platform',
    data: {
      description: 'Secure payment processing',
    },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./views/contactus/contactus.component').then((m) => m.ContactusComponent),
    title: 'Contact Us | East Africa\'s largest Booking Platform',
    data: {
      description: 'Get in touch with our support team',
    },
  },
  {
    path: 'terms',
    loadComponent: () => import('./views/terms/terms').then((m) => m.Terms),
    title: 'Terms | East Africa\'s largest Booking Platform',
    data: {
      description: 'Terms and conditions for using Traveler services',
    },
  },
  {
    path: 'privacy',
    loadComponent: () => import('./views/privacy/privacy').then((m) => m.Privacy),
    title: 'Privacy | East Africa\'s largest Booking Platform',
    data: {
      description: 'Privacy policy for Traveler services',
    },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./views/aboutus/aboutus.component').then((m) => m.AboutusComponent),
    title: 'About Us | East Africa\'s largest Booking Platform',
    data: {
      description: 'Learn more about Traveler and our services',
    },
  },
  {
    path: 'ticket',
    loadComponent: () => import('./views/ticket/ticket.component').then((m) => m.TicketComponent),
    title: 'Ticket | East Africa\'s largest Booking Platform',
    data: {
      description: 'View your travel ticket details',
    },
  },
  {
    path: 'reschedule',
    loadComponent: () => import('./views/reschedule/reschedule').then((m) => m.Reschedule),
    title: 'Reschedule | East Africa\'s largest Booking Platform',
    data: {
      description: 'View your travel ticket details',
    },
  },
  {
    path: 'support',
    loadComponent: () =>
      import('./views/support/support.component').then((m) => m.SupportComponent),
    title: 'Support | East Africa\'s largest Booking Platform',
    data: {
      description: 'Customer support and help center',
    },
  },
  {
    path: 'spin-to-win',
    loadComponent: () =>
      import('./views/spin-the-wheel/spin-the-wheel').then((m) => m.SpinTheWheel),
    title: 'Spin | East Africa\'s largest Booking Platform',
    data: {
      description: 'Customer support and help center',
    },
  },
  {
    path: 'feedback',
    loadComponent: () => import('./views/feedback/feedback').then((m) => m.Feedback),
    title: 'Feedback | East Africa\'s largest Booking Platform',
    data: {
      description: 'Customer support and help center',
    },
  },
  {
    path: 'trip-feedback',
    component: TripFeedbackForm,
    title: 'Trip Feedback | East Africa\'s largest Booking Platform',
    data: {
      description: 'Customer support and help center',
    },
  },
  {
    path: 'confirm-payment',
    component: PaymentVerification,
    title: 'Confirm Payment | East Africa\'s largest Booking Platform',
    data: {
      description: 'Customer support and help center',
    },
  },
  {
    path: 'user-profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./views/user-profile/user-profile-layout.component').then(
        (m) => m.UserProfileLayoutComponent
      ),
    title: 'Profile | East Africa\'s largest Booking Platform',
    data: {
      description: 'Manage your Traveler account',
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        canActivate:[agentGuard],
        loadComponent: () =>
          import('./views/user-profile/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        title: 'Dashboard | East Africa\'s largest Booking Platform',
        data: {
          description: 'Your Traveler account dashboard',
        },
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import('./views/user-profile/bookings/bookings.component').then(
            (m) => m.BookingsComponent
          ),
        title: 'My Bookings | East Africa\'s largest Booking Platform',
        data: {
          description: 'View and manage your bookings',
        },
      },
      {
        path: 'wallet',
        loadComponent: () =>
          import('./views/user-profile/wallet/wallet.component').then((m) => m.WalletComponent),
        title: 'Wallet | East Africa\'s largest Booking Platform',
        data: {
          description: 'Manage your Traveler wallet',
        },
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./views/user-profile/account-details/account-details.component').then(
            (m) => m.AccountDetailsComponent
          ),
        title: 'Account Details | East Africa\'s largest Booking Platform',
        data: {
          description: 'Manage your account information',
        },
      },{
      path :'edit-profile',
        loadComponent: () => import('./views/user-profile/account-details/edit-profile-component/edit-profile-component').then((m) => m.EditProfileComponent),
        title: 'Edit Profile | East Africa\'s largest Booking Platform',
        data: {
          description: 'Edit  your user Profile',
        }
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./views/user-profile/change-password/change-password.component').then(
            (m) => m.ChangePasswordComponent
          ),
        title: 'Change Password | East Africa\'s largest Booking Platform',
        data: {
          description: 'Update your account password',
        },
      },
      {
        path: 'user-list',
        loadComponent: () =>
          import('./views/user-profile/user-list/user-list.component').then(
            (m) => m.UserListComponent
          ),
        title: 'User List | East Africa\'s largest Booking Platform',
        data: {
          description: 'View user list',
        },
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found | East Africa\'s largest Booking Platform',
    data: {
      description: 'The requested page could not be found',
    },
  },
];

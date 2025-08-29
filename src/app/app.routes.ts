import { Routes } from '@angular/router';
import { NotFound } from './views/not-found/not-found';
import { SignUp } from './views/Auth/sign-up/sign-up';

export const routes: Routes = [

    {
        path: 'sign-up',
        component: SignUp
    },
    
    {
        path: 'login',
        component: SignUp
    },
    
    {
        path: '**',
        component : NotFound
    }

];

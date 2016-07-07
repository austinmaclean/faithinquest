import {AuthGuard}          from '../shared/auth/auth.guard';
import {AccountService}        from '../shared/service/account.service';
import {HttpLoaderService}        from '../shared/http-loader/httpLoaderService';
import {Notification}        from '../shared/notification/notification';
import {SignInComponent}     from './signin.component';

export const SignInRoutes = [
    {path: 'login', component: SignInComponent}
];

export const AUTH_PROVIDERS = [AuthGuard, AccountService, HttpLoaderService, Notification];
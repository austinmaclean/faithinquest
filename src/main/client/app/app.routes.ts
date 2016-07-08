import {provideRouter, RouterConfig} from '@angular/router';

import {AuthGuard} from './shared/auth/auth.guard';
import {AccountService} from './shared/service/account.service';
import {HttpLoaderService} from './shared/http-loader/httpLoaderService';

import {HomeComponent} from './pages/home/homeComponent';
import {LoginComponent}     from './pages/login/login.component';
import {AdminComponent} from './pages/admin/adminComponent';
import {CanDeactivateGuard} from './shared/auth/canComponentDeactivate';

// Home

export const homePath = '';

const HomeRoutes:RouterConfig = [
    {path: homePath, component: <any>HomeComponent}
];

// Login

export const loginPath = 'login';

const LoginRoutes = [
    {path: loginPath, component: <any>LoginComponent}
];

// Admin

export const adminPath = 'admin';

const AdminRoutes:RouterConfig = [
    {path: adminPath, component: <any>AdminComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]}
];


export const routes:RouterConfig = [
    ...HomeRoutes,
    ...LoginRoutes,
    ...AdminRoutes,
    {path: '**', redirectTo: ''}
];

export const AUTH_PROVIDERS = [AuthGuard, AccountService, HttpLoaderService];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AUTH_PROVIDERS,
    CanDeactivateGuard
];
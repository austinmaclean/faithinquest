import {provideRouter, RouterConfig} from '@angular/router';

import {AuthGuard} from './shared/auth/auth.guard';
import {AccountService} from './shared/service/account.service';
import {HttpLoaderService} from './shared/http-loader/httpLoaderService';
import {SignInRoutes} from './pages/signin/signin.routes';
import {AdminRoutes} from './pages/admin-update/admin.routes';
import {HomeRoutes} from './pages/client-list/home.routes';

import {CanDeactivateGuard} from './shared/auth/canComponentDeactivate';

export const routes:RouterConfig = [
    ...HomeRoutes,
    ...SignInRoutes,
    ...AdminRoutes,
    { path: '**', redirectTo: '' }
];

export const AUTH_PROVIDERS = [AuthGuard, AccountService, HttpLoaderService];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AUTH_PROVIDERS,
    CanDeactivateGuard
];
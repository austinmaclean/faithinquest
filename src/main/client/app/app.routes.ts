import {provideRouter, RouterConfig} from '@angular/router';

import {SignInRoutes, AUTH_PROVIDERS} from './signin/signin.routes';
import {AdminRoutes} from './admin-update/adminRoutes.routes';
import {HomeRoutes} from './client-list/home.routes';

import { CanDeactivateGuard } from './shared/auth/canComponentDeactivate';

export const routes:RouterConfig = [
    ...HomeRoutes,
    ...SignInRoutes,
    ...AdminRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AUTH_PROVIDERS,
    CanDeactivateGuard
];
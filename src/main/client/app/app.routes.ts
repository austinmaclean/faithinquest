import {provideRouter, RouterConfig, Route} from '@angular/router';

import {AuthGuard} from './shared/auth/auth.guard';
import {AccountService} from './shared/service/account.service';
import {HttpLoaderService} from './shared/http-loader/httpLoaderService';
import {HttpErrorHandlerService} from './shared/http-error-handler/httpErrorHandlerService';

import {HomeComponent} from './pages/home/homeComponent';
import {LoginComponent}     from './pages/login/login.component';
import {AdminComponent} from './pages/admin/adminComponent';
import {AdminStudyComponent} from './pages/admin-study/adminStudyComponent';
import {SlideEditComponent} from './pages/admin-slide/slideEditComponent';
import {CanDeactivateGuard} from './shared/auth/canComponentDeactivate';

// Home

export const homePath = '';

const HomeRoutes:RouterConfig = [
    {
        path: homePath,
        component: <any>HomeComponent
    }
];

// Login

export const loginPath = 'login';

const LoginRoutes = [
    {
        path: loginPath,
        component: <any>LoginComponent
    }
];

// Admin

export const adminPath = 'admin';
export const adminStudyPath = '';
export const adminSlidePath = 'slide';

const AdminChildrenRoutes:Route = [
    {
        path: adminStudyPath,
        component: AdminStudyComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: adminSlidePath,
        component: SlideEditComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
    }
    // {
    //     path: adminSlidePath + '/:id',
    //     component: SlideEditComponent,
    //     canActivate: [AuthGuard],
    //     canDeactivate: [CanDeactivateGuard]
    // }
];

const AdminRoutes:RouterConfig = [
    {
        path: adminPath,
        component: <any>AdminComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard],
        children: <any>AdminChildrenRoutes
    }
];

// Main

export const routes:RouterConfig = [
    ...HomeRoutes,
    ...LoginRoutes,
    ...AdminRoutes,
    {
        path: '**',
        redirectTo: ''
    }
];

export const AUTH_PROVIDERS = [AuthGuard, AccountService, HttpLoaderService, HttpErrorHandlerService];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AUTH_PROVIDERS,
    CanDeactivateGuard
];
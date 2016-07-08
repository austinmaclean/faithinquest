import {RouterConfig} from '@angular/router';

import {AdminComponent} from './adminComponent';
import {AuthGuard} from '../../shared/auth/auth.guard';
import {CanDeactivateGuard} from '../../shared/auth/canComponentDeactivate';

export const AdminRoutes:RouterConfig = [
    {path: 'admin', component: <any>AdminComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]}
];
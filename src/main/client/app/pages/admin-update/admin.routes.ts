import {RouterConfig} from '@angular/router';

import {AdminUpdateComponent} from './adminUpdateComponent';
import {AuthGuard} from '../../shared/auth/auth.guard';
import {CanDeactivateGuard} from '../../shared/auth/canComponentDeactivate';

export const AdminRoutes:RouterConfig = [
    {path: 'admin', component: <any>AdminUpdateComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]}
];
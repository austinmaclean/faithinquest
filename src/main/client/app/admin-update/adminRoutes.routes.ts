import {RouterConfig} from '@angular/router';

import {AdminUpdateComponent} from './adminUpdateComponent';
import {AuthGuard} from '../shared/service/auth.guard';
import {CanDeactivateGuard} from '../shared/service/canComponentDeactivate';

export const AdminRoutes:RouterConfig = [
    {path: 'admin', component: AdminUpdateComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]}
];
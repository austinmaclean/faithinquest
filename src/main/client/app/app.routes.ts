import {provideRouter, RouterConfig} from '@angular/router';

import {SignInComponent} from './signin/index';
import {AdminUpdateComponent} from './admin-update/adminUpdateComponent';
import {ClientListComponent} from './client-list/clientListComponent';

const routes:RouterConfig = [
    ...<RouterConfig>[{path: 'login', component: SignInComponent}],
    ...<RouterConfig>[{path: 'admin', component: AdminUpdateComponent}],
    ...<RouterConfig>[{path: '', component: ClientListComponent}]
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
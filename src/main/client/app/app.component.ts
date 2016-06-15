import {Component, ViewContainerRef} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';

import {DataService} from './shared/index';
import {AuthRouterOutletDirective} from './shared/index';
import {SignInComponent} from './signin/index';
import {AdminUpdateComponent} from './admin-update/adminUpdateComponent';
import {ClientListComponent} from './client-list/clientListComponent';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
    moduleId: module.id,
    selector: 'sd-app',
    templateUrl: 'app.component.html',
    viewProviders: [DataService, HTTP_PROVIDERS],
    directives: [<any>AuthRouterOutletDirective]
})
@RouteConfig([
    {path: '/', component: <any>ClientListComponent, as: 'Home', useAsDefault: true},
    {path: '/login', component: <any>SignInComponent, as: 'Login'},
    {path: '/admin', component: <any>AdminUpdateComponent, as: 'Admin'},
    {path: '/*path', redirectTo: ['Home']}
])
export class AppComponent {

    viewContainerRef:ViewContainerRef = null;

    public constructor(viewContainerRef:ViewContainerRef) {
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }

}

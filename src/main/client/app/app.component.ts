import {Component} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';

import {AuthRouterOutletDirective} from './shared/index';
import {SignInComponent} from './signin/index';
import {StudyListComponent} from './study-list/index';
import {AdminStudyUpdateComponent} from './admin-study-update/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
    moduleId: module.id,
    selector: 'sd-app',
    templateUrl: 'app.component.html',
    viewProviders: [HTTP_PROVIDERS],
    directives: [AuthRouterOutletDirective]
})
@RouteConfig([
    {path: '/', component: <any>StudyListComponent, as: 'Home', useAsDefault:true},
    {path: '/login', component: <any>SignInComponent, as: 'Login'},
    {path: '/admin', component: <any>AdminStudyUpdateComponent, as: 'Admin'},
    {path: '/*path', redirectTo:['Home']}
])
export class AppComponent {
}

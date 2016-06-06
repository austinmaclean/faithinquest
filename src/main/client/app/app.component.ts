import {Component} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';

import {SigninComponent} from './signin/index';
import {StudyListComponent} from './study-list/index';
import {AdminStudyUpdateComponent} from './admin-study-update/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
    moduleId: module.id,
    selector: 'sd-app',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'app.component.html',
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    {path: '/', component: <any>StudyListComponent},
    {path: '/login', component: <any>SigninComponent},
    {path: '/admin-study', component: <any>AdminStudyUpdateComponent}
])

export class AppComponent {

    constructor(private router:Router) {
        this.router = router;
    }

    // ngOnInit() {
    //     this.router.navigate(['/']);
    // }

}

import {Component, ViewContainerRef} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {HttpLoader} from './shared/http-loader/httpLoader';

import {Config} from './shared/config/env.config';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
    moduleId: module.id,
    selector: 'sd-app',
    templateUrl: 'app.component.html',
    viewProviders: [<any>Http, HTTP_PROVIDERS],
    directives: [<any>HttpLoader, ROUTER_DIRECTIVES]
})
export class AppComponent {

    viewContainerRef:ViewContainerRef = null;

    public constructor(viewContainerRef:ViewContainerRef) {
        console.log('Environment config', Config);

        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }

}

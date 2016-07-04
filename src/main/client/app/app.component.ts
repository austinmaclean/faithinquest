import {Component} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {Config} from './shared/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
    moduleId: module.id,
    selector: 'sd-app',
    templateUrl: 'app.component.html',
    viewProviders: [Http, HTTP_PROVIDERS],
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {

    constructor() {
        console.log('Environment config', Config);
    }

}

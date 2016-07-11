import {Component, ViewContainerRef} from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';

// import {Angulartics2} from 'angulartics2';
// import {Angulartics2GoogleAnalytics} from 'angulartics2/src/providers/angulartics2-google-analytics';

import {HttpLoader} from './shared/http-loader/httpLoader';

import {Config} from './shared/config/env.config';
import {MessageComponent} from './shared/message-component/messageComponent';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
    moduleId: module.id,
    selector: 'ti-app',
    templateUrl: 'app.component.html',
    // providers: [Angulartics2GoogleAnalytics],
    viewProviders: [<any>Http, HTTP_PROVIDERS],
    directives: [<any>MessageComponent, <any>HttpLoader, ROUTER_DIRECTIVES]
})
export class AppComponent {

    viewContainerRef:ViewContainerRef = null;

    public constructor(viewContainerRef:ViewContainerRef
                       // angulartics2: Angulartics2,
                       // angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
    ) {
        console.log('Environment config', Config);

        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
    }

}

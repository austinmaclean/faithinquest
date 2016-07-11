import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {bootstrap} from '@angular/platform-browser-dynamic';

import {NOTIFICATION_PROVIDERS} from "./shared/notification/notification";
import {APP_ROUTER_PROVIDERS} from './app.routes';
import {AppComponent} from './app.component';
// import {Angulartics2} from 'angulartics2';

if ('<%= ENV %>' === 'prod') {
    enableProdMode();
}

/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */
bootstrap(<any>AppComponent, [
    disableDeprecatedForms(), // disable the old form functionality and the warning message.
    provideForms(),
    HTTP_PROVIDERS,
    NOTIFICATION_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    // Angulartics2
]).catch(err => console.error(err));

// In order to start the Service Worker located at "./worker.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
//
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./worker.js').then((registration: any) =>
//       console.log('ServiceWorker registration successful with scope: ', registration.scope))
//     .catch((err: any) =>
//       console.log('ServiceWorker registration failed: ', err));
// }

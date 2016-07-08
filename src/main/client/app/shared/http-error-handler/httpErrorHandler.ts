import {OnInit, Directive, ElementRef} from '@angular/core';

import {HttpLoaderEventEmitter} from '../notification/notification';
import {HttpErrorHandlerService} from './httpErrorHandlerService';

@Directive({
    selector: '[HttpErrorHandler]',
    providers: [HttpErrorHandlerService]
})
export class HttpErrorHandler implements OnInit {

    private el:JQueryStatic;

    public constructor(el:ElementRef, private loaderEventEmitter:HttpLoaderEventEmitter) {

    }

    ngOnInit() {

    }

}
import {OnInit, Directive, ElementRef} from '@angular/core';

import {HttpLoaderEventEmitter} from '../notification/notification';
import {HttpLoaderService} from '../http-loader/httpLoaderService';

@Directive({
    selector: '[HttpLoader]',
    providers: [HttpLoaderService]
})
export class HttpLoader implements OnInit {

    private el:JQueryStatic;

    public constructor(el:ElementRef, private loaderEventEmitter:HttpLoaderEventEmitter) {
        this.el = el.nativeElement;
    }

    ngOnInit() {
        jQuery(this.el).hide();

        this.loaderEventEmitter.subscribe(loading => {
            let elem = jQuery(this.el);
            if (loading) {
                if (elem.is(':hidden'))
                    elem.show();
            } else {
                if (elem.is(':visible'))
                    elem.hide();
            }
        });
    }

}
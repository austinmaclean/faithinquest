import {OnInit, OnDestroy, Directive, ElementRef} from '@angular/core';

import {Notification} from '../notification/notification';
import {HttpLoaderService} from '../http-loader/httpLoaderService';

@Directive({
    selector: '[HttpLoader]',
    providers: [HttpLoaderService]
})
export class HttpLoader implements OnInit, OnDestroy {

    private el:JQueryStatic;

    onLoading = (loading:boolean) => {
        let elem = jQuery(this.el);
        if (loading) {
            if (elem.is(':hidden'))
                elem.show();
        } else {
            if (elem.is(':visible'))
                elem.hide();
        }
    };

    public constructor(el:ElementRef, private notification:Notification) {
        this.el = el.nativeElement;
    }

    ngOnInit() {
        jQuery(this.el).hide();

        this.notification.Loading.on(this.onLoading);
    }

    ngOnDestroy() {
        this.notification.Loading.off(this.onLoading);
    }

}
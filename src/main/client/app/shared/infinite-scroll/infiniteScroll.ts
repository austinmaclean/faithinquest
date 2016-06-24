import {Component, OnInit, OnChanges, Input, ViewChild, Output, EventEmitter, Directive, provide} from '@angular/core';
import {NgModel} from '@angular/common';
import {ScrollableResult} from '../infinite-scroll/scrollableResult';

@Directive({
    selector: '[InfiniteScroll]',
    providers: [NgModel],
    host: {
        '(window:scroll)': 'onScroll($event)'
    },
})
export class InfiniteScroll implements OnInit, OnChanges {

    @Input('ScrollDistance') scrollDistance:number;
    @Input('ScrollDisabled') scrollDisabled:boolean;

    private scrollEnabled:boolean = true;
    private checkWhenEnabled:boolean = false;

    @Output() OnScrollMethod = new EventEmitter<any>();

    constructor() {

    }

    ngOnInit():any {
        console.log('init');

        this.onScroll();
    }

    ngOnChanges(changes) {
        console.log('changes');

        this.scrollEnabled = !this.scrollDisabled;
        if (this.scrollEnabled && this.checkWhenEnabled) {
            this.checkWhenEnabled = false;
            setTimeout(() => this.onScroll(), 300); // time on the page rendering
        }
    }

    onScroll():void {
        if (jQuery(document).height() > jQuery(window).height()) {
            // scroll visible
            if (jQuery(window).scrollTop() + jQuery(window).height() > jQuery(document).height() - this.scrollDistance) {
                if (this.scrollEnabled) {
                    this.OnScrollMethod.emit(null);
                } else {
                    this.checkWhenEnabled = true;
                }
            }
        } else {
            // scroll not visible
            if (this.scrollEnabled) {
                this.checkWhenEnabled = true;
                this.OnScrollMethod.emit(null);
            }
        }
    };
}
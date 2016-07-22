import {Component, ElementRef, Input, OnInit, OnChanges} from '@angular/core';
import {JQWord} from "./JQWord";
import {JQCloudOptions} from "./jqcloudOptions";

@Component({
    moduleId: module.id,
    selector: 'jq-cloud',
    template: '<div></div>'
})

export class JQCloud implements OnInit, OnChanges{

    @Input() words: Array<any>;
    @Input() width:number;
    @Input() height:number;

    private el:any;

    private jqwords: Array<JQWord> = [];

    private jqOptions : JQCloudOptions = new JQCloudOptions();

    inited:boolean = false;

    constructor (el: ElementRef) {
        this.el = el.nativeElement;
    }

    ngOnInit() {
    }

    ngOnChanges(changes) {
        if (this.width) this.jqOptions.width = Number(this.width);
        if (this.height) this.jqOptions.height = Number(this.height);
        if (this.words && this.words.length) {
            for (var word of this.words) {
                let jqword:JQWord = new JQWord(word.text, word.weight);
                if (word.link) jqword.link = word.link;
                if (word.handlers) jqword.handlers = word.handlers;
                this.jqwords.push(jqword);
            }
            setTimeout(() => {
                this.inited = true;
                jQuery(this.el.firstChild)["jQCloud"](this.jqwords, this.jqOptions);
            }, 500);
        }

        if (this.inited) {
            jQuery(this.el)["jQCloud"]('update', this.jqwords);
        }

    }
    
}
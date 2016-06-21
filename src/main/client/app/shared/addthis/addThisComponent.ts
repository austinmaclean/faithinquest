import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {LoadScript} from '../youtube-embed-component/loadScript';

@Component({
    moduleId: module.id,
    selector: 'ti-addthis-share',
    templateUrl: 'addThisComponent.html',
    styleUrls: ['addThisComponent.css'],
})

export class AddThisComponent implements OnInit, OnChanges {

    @Input() atcode : string;
    @Input() aturl : string = '';
    @Input() attitle : string = '';
    @Input() atdesc : string = '';

    public share = {
        code: '',
        url: '',
        title: '',
        description: ''
    };

    public ready : boolean;
    addthis_share : any;

    ngOnInit() {
        this.loadWidget();
    }

    ngOnChanges(changes) {
        console.log('changes='+this.atcode);
        this.atcode = this.atcode;
        this.share.code = this.atcode;
        this.share.url = this.aturl;
        this.share.title = this.attitle;
        this.share.description = this.atdesc;
    }

    loadWidget() {
        LoadScript.load('//s7.addthis.com/js/300/addthis_widget.js#pubid='+this.share.code, {async: false}, (err, script) => {
            this.ready = true;
        });
    }

}
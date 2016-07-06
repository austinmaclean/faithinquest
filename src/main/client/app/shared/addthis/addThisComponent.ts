import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'ti-addthis-share',
    templateUrl: 'addThisComponent.html',
    styleUrls: ['addThisComponent.css'],
})

export class AddThisComponent implements OnChanges, OnInit {

    @Input() atcode:string;
    @Input() aturl:string = '';
    @Input() attitle:string = '';
    @Input() atdesc:string = '';

    public share = {
        code: '',
        url: '',
        title: '',
        description: ''
    };

    ngOnInit() {
        if (window['addthis']) {
            window['addthis'].button('.addthis_button_compact');
        }
    }

    ngOnChanges(changes) {
        this.atcode = this.atcode;
        this.share.code = this.atcode;
        this.share.url = this.aturl;
        this.share.title = this.attitle;
        this.share.description = this.atdesc;
    }

}
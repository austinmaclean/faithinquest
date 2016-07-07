import {Component, Input, AfterViewInit} from '@angular/core';
import {AddThisShare} from '../model/AddThisShare';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
    moduleId: module.id,
    selector: 'ti-addthis-share',
    templateUrl: 'addThisComponent.html',
    styleUrls: ['addThisComponent.css'],
})

export class AddThisComponent implements AfterViewInit {

    public share:AddThisShare;

    shareConfig:Subject<AddThisShare> = new BehaviorSubject(null);

    @Input() set ShareConfig(config:AddThisShare) {
        this.share = config;
    };

    ngAfterViewInit() {
        if (window['addthis']) {
            window['addthis'].button('.addthis_button_compact');
        }
    }

}
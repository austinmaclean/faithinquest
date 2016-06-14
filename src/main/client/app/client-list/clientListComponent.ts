import {Component, OnInit} from '@angular/core';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import {StudyService, FooterComponent, StudyListComponent} from '../shared/index';
import {Study} from '../shared/model/study';

@Component({
    moduleId: module.id,
    selector: 'ti-study-list',
    templateUrl: 'clientListComponent.html',
    styleUrls: ['clientListComponent.css'],
    providers: [StudyService],
    directives: [<any>StudyListComponent, <any>AlertComponent, <any>FooterComponent]
})

export class ClientListComponent implements OnInit {

    public list: Study[];

    constructor() {
    }

    ngOnInit() {
        console.log('study init');
    }


}

import {Component, OnInit} from '@angular/core';
import {AdminStudyListComponent} from './admin-study-list/admin-study-list.component';
import {AdminStudyEditComponent} from './admin-study-edit/admin-study-edit.component';
import {FooterComponent} from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-admin-study-update',
    templateUrl: 'admin-study-update.component.html',
    styleUrls: ['admin-study-update.component.css'],
    directives: [<any>AdminStudyListComponent, <any>AdminStudyEditComponent, <any>FooterComponent]
})

export class AdminStudyUpdateComponent implements OnInit {

    ngOnInit() {
        console.log('init');
    }

}

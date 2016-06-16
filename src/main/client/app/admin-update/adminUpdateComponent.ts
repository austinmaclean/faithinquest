import {Component, OnInit} from '@angular/core';
import {AdminEditComponent} from './admin-edit/adminEditComponent';
import {StudyListComponent} from '../shared/study-list-component/studyListComponent';
import {FooterComponent} from '../shared/footer/footer.component';

@Component({
    moduleId: module.id,
    selector: 'ti-admin-study-update',
    templateUrl: 'adminUpdateComponent.html',
    styleUrls: ['adminUpdateComponent.css'],
    directives: [<any>StudyListComponent, <any>AdminEditComponent, <any>FooterComponent]
})

export class AdminUpdateComponent implements OnInit {

    ngOnInit() {
        console.log('init');
    }

}

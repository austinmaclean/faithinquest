import {Component, OnInit} from '@angular/core';
import {StudyService, Study} from '../../shared/index';
import {AdminStudyComponent} from './admin-study/admin-study.component';

@Component({
    moduleId: module.id,
    selector: 'sd-admin-study-list',
    templateUrl: 'admin-study-list.component.html',
    styleUrls: ['admin-study-list.component.css'],
    providers: [StudyService],
    directives: [<any>AdminStudyComponent]
})
export class AdminStudyListComponent implements OnInit {

    public list:Study[];

    constructor(private studyService:StudyService) {
    }

    ngOnInit() {
        this.getStudies();
    }

    getStudies() {
        this.studyService.getStudies().then(list => this.list = list);
    }

}

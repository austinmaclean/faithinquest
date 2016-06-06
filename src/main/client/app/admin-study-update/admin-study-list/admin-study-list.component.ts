import {Component, OnInit} from '@angular/core';
import {Study} from '../../shared/model/study';
import {StudyService} from '../../shared/bible-study-list/bible-study-list.service';
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

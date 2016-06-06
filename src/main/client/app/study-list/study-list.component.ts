import {Component, OnInit} from '@angular/core';
import {StudyComponent} from './study/study.component';
import {StudyService} from '../shared/index';
import {Study} from '../shared/model/study';

@Component({
    moduleId: module.id,
    selector: 'sd-study-list',
    templateUrl: 'study-list.component.html',
    styleUrls: ['study-list.component.css'],
    providers: [StudyService],
    directives: [<any>StudyComponent]
})

export class StudyListComponent implements OnInit {

    public list: Study[];

    constructor(private studyService:StudyService) {
    }

    ngOnInit() {
        this.getStudies();
    }

    getStudies() {
        this.studyService.getStudies().then(list => this.list = list);
    }

}

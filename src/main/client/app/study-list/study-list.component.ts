import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router-deprecated';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import {StudyComponent} from './study/study.component';
import {StudyService, Study, FooterComponent} from '../shared/index';
import {Study} from '../shared/model/study';

@Component({
    moduleId: module.id,
    selector: 'sd-study-list',
    templateUrl: 'study-list.component.html',
    styleUrls: ['study-list.component.css'],
    providers: [StudyService],
    directives: [<any>StudyComponent, <any>AlertComponent, <any>FooterComponent]
})

export class StudyListComponent implements OnInit {

    public list: Study[];

    constructor(private studyService:StudyService, private router:Router) {
    }

    ngOnInit() {
        this.getStudies();
    }

    getStudies() {
        this.studyService.getStudies().subscribe(studies => this.list = studies);
    }

    goToAdmin() {
        this.router.navigate(['/Admin']);
    }

}

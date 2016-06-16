import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';

import {Study} from '../../shared/model/study';
import {StudyService} from '../../shared/index';
import {StudyElementComponent} from './study-element/studyElementComponent';
import {YTEmbedComponent} from '../youtube-embed-component/youtubeEmbedComponent';
import {ModalVideoComponent} from '../modal-component/modalVideoComponent';

@Component({
    moduleId: module.id,
    selector: 'ti-study-list',
    templateUrl: 'studyListComponent.html',
    styleUrls: ['studyListComponent.css'],
    providers: [StudyService],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [<any>StudyElementComponent, <any>YTEmbedComponent, <any>ModalVideoComponent, MODAL_DIRECTVES, CORE_DIRECTIVES]
})

export class StudyListComponent implements OnInit {

    @Input() editmode:boolean;

    @Output() onStudyEdit = new EventEmitter<Study>();
    @Output() onStudyDelete = new EventEmitter<Study>();

    @ViewChild(<any>ModalVideoComponent) private component : ModalVideoComponent;

    public list:Study[];

    constructor(private studyService:StudyService) {
    }

    ngOnInit() {
        this.getStudies();
    }

    public getStudies() {
        this.studyService.get().subscribe(list => {
            this.list = list;
        });
    }

    processStudy(study:Study) {

        var studyCopy : Study = Object.assign({}, study);;

        if (this.editmode) {
            this.onStudyEdit.emit(studyCopy);
        } else {
            this.component.showModal(studyCopy);
        }
    }

    deleteStudy (study: Study) {
        var studyCopy : Study = Object.assign({}, study);
        if (this.editmode) {
            this.onStudyDelete.emit(studyCopy);
        }
    }

}

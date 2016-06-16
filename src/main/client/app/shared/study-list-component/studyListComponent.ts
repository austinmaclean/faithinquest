import {Component, OnInit, Input, ViewChild} from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';

import {Study} from '../../shared/model/study';
import {StudyService} from '../../shared/index';
import {StudyElementComponent} from './study-element/studyElementComponent';
import {YTEmbedComponent} from '../youtube-embed-component/youtubeEmbedComponent';
import {ModalComponent} from '../modal-component/modal.component';

@Component({
    moduleId: module.id,
    selector: 'ti-study-list',
    templateUrl: 'studyListComponent.html',
    styleUrls: ['studyListComponent.css'],
    providers: [StudyService],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [<any>StudyElementComponent, <any>YTEmbedComponent, <any>ModalComponent, MODAL_DIRECTVES, CORE_DIRECTIVES]
})

export class StudyListComponent implements OnInit {

    @Input() editMode:boolean;

    //@ViewChild('lgModal') lgModal;
    @ViewChild(<any>ModalComponent) private component : ModalComponent;

    public selectedStudy:Study;
    public list:Study[];

    constructor(private studyService:StudyService) {
    }

    ngOnInit() {
        this.getStudies();
    }

    getStudies() {
        this.studyService.get().subscribe(list => {
            this.list = list;
        });
    }

    playVideo(study:Study) {
        
        this.component.showModal(study);

/*
        if (this.lgModal) {
            this.selectedStudy = study;
            this.lgModal.show();
        }
*/
        // this.videoPlayer.playVideo(study.code, study.start); //7L6zcVQIhBE //M7lc1UVf-VE
    }

}

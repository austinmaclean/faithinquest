import {Component, OnInit, OnChanges, Input, ViewChild, Output, EventEmitter} from '@angular/core';

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

export class StudyListComponent implements OnInit, OnChanges {

    @Input() editmode:boolean;

    @Output() onStudyEdit = new EventEmitter<Study>();
    @Output() onStudyDelete = new EventEmitter<Study>();
    @Output() onSearchData = new EventEmitter<string>();

    @ViewChild(<any>ModalVideoComponent) private component : ModalVideoComponent;

    public list:Study[];

    constructor(private studyService:StudyService) {
    }

    ngOnInit() {
        console.log('study component init')
        this.getStudies();
    }

    ngOnChanges(changes) {
        console.log('study component changes')
    }

    public onSelectSpeaker(speaker:string) {
        if (this.onSearchData) {
            this.onSearchData.emit(speaker);
        }
    }

    public getStudies(pattern?:string, speaker?:string) {
        this.studyService.find(pattern, speaker).subscribe(list => {
            this.list = list;
        });
    }

    editStudy(study: Study) {
        var studyCopy : Study = Object.assign({}, study);
        this.onStudyEdit.emit(studyCopy);
        var time = document.body.scrollTop*0.7;
        this.scrollTo(document.body, 0, time);
    }

    viewVideo(study:Study) {
        debugger;
        var studyCopy : Study = Object.assign({}, study);
        this.component.showModal(studyCopy);
    }

    deleteStudy (study: Study) {
        var studyCopy : Study = Object.assign({}, study);
        if (this.editmode) {
            this.onStudyDelete.emit(studyCopy);
        }
    }

    scrollTo(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(() => {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            this.scrollTo(element, to, duration - 10);
        }, 10);
    }

}

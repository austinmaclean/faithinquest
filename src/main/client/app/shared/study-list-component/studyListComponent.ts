import {Component, OnInit, OnChanges, Input, ViewChild, Output, EventEmitter} from '@angular/core';

import {CORE_DIRECTIVES} from '@angular/common';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';

import {Study} from '../../shared/model/study';
import {StudyService} from '../../shared/index';
import {StudyElementComponent} from './study-element/studyElementComponent';
import {YTEmbedComponent} from '../youtube-embed-component/youtubeEmbedComponent';
import {ModalVideoComponent} from '../modal-component/modalVideoComponent';
import {InfiniteScroll} from "../infinite-scroll/infiniteScroll";

@Component({
    moduleId: module.id,
    selector: 'ti-study-list',
    templateUrl: 'studyListComponent.html',
    styleUrls: ['studyListComponent.css'],
    providers: [StudyService],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [<any>InfiniteScroll, <any>StudyElementComponent, <any>YTEmbedComponent, <any>ModalVideoComponent, MODAL_DIRECTVES, CORE_DIRECTIVES]
})

export class StudyListComponent implements OnInit, OnChanges {

    search:any = {
        pattern: null,
        patternOld: null,
        speaker: null,
        speakerOld: null
    };

    public list:Study[];

    @Input() editmode:boolean;

    @Output() onStudyEdit = new EventEmitter<Study>();
    @Output() onStudyDelete = new EventEmitter<Study>();
    @Output() onSearchPattern = new EventEmitter<string>();

    @ViewChild(<any>ModalVideoComponent) private component : ModalVideoComponent;

    constructor(private studyService:StudyService) {
    }

    ngOnInit() {
        console.log('study component init');
        this.getStudies();
    }

    ngOnChanges(changes) {
        console.log('study component changes');
    }

    public onSelectSpeaker(speaker:string) {
        this.onSearch(speaker);
    }

    public getStudies(pattern?:string, speaker?:string) {
        this.studyService.find(pattern, speaker).subscribe(list => {
            this.list = list;
        });
    }

    editStudy(study: Study) {
        var studyCopy : Study = Object.assign({}, study);
        this.onStudyEdit.emit(studyCopy);
        var time = document.body.scrollTop * 0.7 / (document.body.scrollTop * 0.001);
        this.scrollTo(document.body, 0, time);
    }

    viewVideo(study:Study) {
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

    public onPatternSearch(pattern : string) {
        this.search.pattern = pattern;
        this.onSearch();
    }

    public onSearch(speaker?:string) {
        if(speaker) {
            this.search.speaker = speaker;
            this.search.pattern = null;
        }
        if (this.search.pattern !== this.search.patternOld || this.search.speaker !== this.search.speakerOld) {
            this.search.patternOld = this.search.pattern;
            this.search.speakerOld = this.search.speaker;
            this.getStudies(this.search.pattern, this.search.speaker);
        }
    }

    onSearchClear(fieldName:string) {
        this.search[fieldName] = null;
        if (fieldName === 'pattern') {
            this.onSearchPattern.emit('');
        }
        this.onSearch();
    }

    nextPage() {
        // debugger;
    }

}

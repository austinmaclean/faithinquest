import {Component, OnInit, Input} from '@angular/core';
import {Study} from '../../shared/model/study';
import {StudyService} from '../../shared/index';
import {StudyElementComponent} from './study-element/studyElementComponent';
import {YTEmbedComponent} from '../youtube-embed-component/youtubeEmbedComponent';

@Component({
    moduleId: module.id,
    selector: 'ti-study-list',
    templateUrl: 'studyListComponent.html',
    styleUrls: ['studyListComponent.css'],
    providers: [StudyService],
    directives: [<any>StudyElementComponent, <any>YTEmbedComponent]
})

export class StudyListComponent implements OnInit {

    @Input() editMode: boolean;

    public list:Study[];

    constructor(private studyService:StudyService) {
    }

    ngOnInit() {
        this.getStudies();
    }

    getStudies() {
        this.studyService.getStudies().subscribe(list => {this.list = list;});
    }

    playVideo(study : Study) {
        this.videoPlayer.playVideo(study.code, study.start); //7L6zcVQIhBE //M7lc1UVf-VE
    }

}

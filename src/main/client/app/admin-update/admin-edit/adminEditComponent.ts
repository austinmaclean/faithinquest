import {Component, ViewChild, OnInit} from '@angular/core';
import { NgForm } from '@angular/common';
import {StudyService} from '../../shared/index';
import {YTEmbedComponent} from '../../shared/youtube-embed-component/youtubeEmbedComponent';
import {Study} from "../../shared/model/study";

@Component({
    moduleId: module.id,
    selector: 'ti-admin-study-edit',
    templateUrl: 'adminEditComponent.html',
    styleUrls: ['adminEditComponent.css'],
    providers: [StudyService],
    directives: [<any>YTEmbedComponent]
})

export class AdminEditComponent implements OnInit {

    @ViewChild (<any>YTEmbedComponent) videoPlayer:YTEmbedComponent;

    model = new Study(new Date().getTime(), '', '', '', '', 0, 0);

    constructor(private studyService:StudyService) {
    }

    ngOnInit() {
        console.log('init');
    }

    onSubmit() {
        //this.videoPlayer.playVideo('7L6zcVQIhBE', 30); //7L6zcVQIhBE //M7lc1UVf-VE
        console.log(JSON.stringify(this.model));
        this.studyService.createStudy(<Study>this.model);
    }
}

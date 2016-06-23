import {Component, ViewChild, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES} from 'ng2-file-upload/ng2-file-upload';
import {BulkUploader} from './bulkUploader';
import {OutputMessage} from './outputMessage';
import {StudyService} from '../../shared/index';
import {YTEmbedComponent} from '../../shared/youtube-embed-component/youtubeEmbedComponent';
import {Study} from '../../shared/model/study';

@Component({
    moduleId: module.id,
    selector: 'ti-admin-study-edit',
    templateUrl: 'adminEditComponent.html',
    styleUrls: ['adminEditComponent.css'],
    providers: [StudyService],
    directives: [FILE_UPLOAD_DIRECTIVES, <any>NgClass, <any>NgStyle, <any>YTEmbedComponent, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class AdminEditComponent implements OnInit, OnChanges {

    @ViewChild(<any>YTEmbedComponent) videoPlayer:YTEmbedComponent;
    @Output() onStudiesUpdated = new EventEmitter<OutputMessage>();

    thumbUrl:string = '../../assets/img/over_big.png';

    createMode:boolean;
    playerReady:boolean;
    hideThumb = false;

    model = new Study(null, new Date().getTime(), '', '', '', '', 0, 0);

    uploader:BulkUploader = new BulkUploader({
        url: '/api/admin/study/import',
        autoUpload: true,
        allowedFileType: ['xls']
    }, (fileName) => {
        this.onStudiesUpdated.emit(new OutputMessage(true, fileName + ' imported successfully'));
    }, (fileName) => {
        this.onStudiesUpdated.emit(new OutputMessage(false, fileName + ' import error'));
    });

    constructor(private studyService:StudyService) {
    }

    ngOnInit() {
        console.log('init');
        this.createMode = true;
    }

    ngOnChanges(changes) {
        console.log('changes');
    }

    validateYouTubeLink() {
        var linkElm:HTMLInputElement = <HTMLInputElement>document.getElementById('link');
        if (!this.matchYoutubeUrl(linkElm.value)) {
            linkElm.setCustomValidity('Please enter valid youtube link');
            return;
        } else {
            linkElm.setCustomValidity('');
        }
    }

    onSubmit() {
        console.log(JSON.stringify(this.model));
        if (this.createMode) {
            this.studyService.create(<Study>this.model).subscribe(res => {
                this.onStudiesUpdated.emit(new OutputMessage(true, 'Study "' + this.model.title + '" created'));
                this.onClear();
            });
        } else {
            this.studyService.update(<Study>this.model).subscribe(res => {
                this.onStudiesUpdated.emit(new OutputMessage(true, 'Study "' + this.model.title + '" updated'));
                this.onClear();
            });
        }
    }

    public deleteStudy(study:Study) {
        this.studyService.remove(study.id.toString()).subscribe(res => {
            this.onStudiesUpdated.emit(new OutputMessage(true, 'Study was deleted'));
            this.onClear();
        });
    }

    onClear() {
        this.model = new Study(null, new Date().getTime(), '', '', '', '', 0, 0);
        this.videoPlayer.stop();
        this.videoPlayer.loadAndPause(null);
        this.createMode = true;
        this.thumbUrl = '../../assets/img/over_big.png';
        this.hideThumb = false;
    }

    public editStudy(study:Study) {
        if (this.playerReady) {
            this.model = study;
            this.createMode = false;
            if (this.model.link) {
                this.onChange(this.model.link);
            }
        }
    }

    onChange(newVal) {
        this.validateYouTubeLink();
        var code = this.getParameterByName('v', newVal);
        if (code) {
            var startTime = this.model.startMin * 60 + this.model.startSec;
            this.videoPlayer.loadAndPause(code, startTime);
            this.thumbUrl = 'http://img.youtube.com/vi/' + code + '/0.jpg';
            this.hideThumb = false;
        }
    }

    onYTReady(flag:boolean) {
        console.log(flag);
        this.playerReady = true;
    }

    onThumbClick() {
        console.log('thumb click');
        if (this.model.link !== '' && !this.hideThumb) {
            this.hideThumb = true;
            this.videoPlayer.play();
        }
    }

    getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    matchYoutubeUrl(url) {
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(p)) {
            return url.match(p)[1];
        }
        return false;
    }

}

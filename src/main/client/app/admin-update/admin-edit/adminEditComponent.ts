import {Component, ViewChild, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES} from 'ng2-file-upload/ng2-file-upload';
import {BulkUploader} from './bulkUploader';
import {OutputMessage} from './outputMessage';
import {StudyService} from '../../shared/index';
import {YTEmbedComponent} from '../../shared/youtube-embed-component/youtubeEmbedComponent';
import {Study} from '../../shared/model/study';
import {VimeoEmbedComponent} from '../../shared/vimeo-embed-component/vimeoEmbedComponent';
import {VideoType} from '../../shared/modal-component/modalVideoComponent';

@Component({
    moduleId: module.id,
    selector: 'ti-admin-study-edit',
    templateUrl: 'adminEditComponent.html',
    styleUrls: ['adminEditComponent.css'],
    providers: [StudyService],
    directives: [FILE_UPLOAD_DIRECTIVES, <any>NgClass, <any>NgStyle,
        <any>YTEmbedComponent, CORE_DIRECTIVES, FORM_DIRECTIVES, <any>VimeoEmbedComponent]
})
export class AdminEditComponent implements OnInit, OnChanges {

    @ViewChild(<any>YTEmbedComponent) videoPlayer:YTEmbedComponent;
    @ViewChild(<any>VimeoEmbedComponent) vimeoPlayer:VimeoEmbedComponent;
    @Output() onStudiesUpdated = new EventEmitter<OutputMessage>();

    thumbUrl:string = '../../assets/img/over_big.png';

    uploader:BulkUploader;
    createMode:boolean;
    playerReady:boolean = false;
    hideThumb = false;
    videoMode: VideoType = VideoType.NONE;

    model = new Study(null, new Date().getTime(), '', '', '', '', 0, 0);

    constructor(private studyService:StudyService) {
        this.uploader = new BulkUploader({
            url: '/api/admin/study/import',
            autoUpload: true,
            allowedFileType: ['xls']
        });
        this.uploader.successHandler.subscribe(fileName =>
            this.onStudiesUpdated.emit(new OutputMessage(true, fileName + ' imported successfully')));
        this.uploader.errorHandler.subscribe(fileName =>
            this.onStudiesUpdated.emit(new OutputMessage(false, fileName + ' import error')));
    }

    ngOnInit() {
        this.createMode = true;
    }

    ngOnChanges(changes) {
        console.log('changes');
    }

    validateVideoLink() {
        var linkElm:HTMLInputElement = <HTMLInputElement>document.getElementById('link');
        if (!this.matchYoutubeUrl(linkElm.value) && !this.matchVimeo(linkElm.value)) {
            linkElm.setCustomValidity('Please enter valid youtube or vimeo link');
            return;
        } else {
            linkElm.setCustomValidity('');
        }
    }

    getVideoType(urlString:string) {

        if (this.matchYoutubeUrl(urlString)) {
            return VideoType.YOUTUBE;
        } else if (this.matchVimeo(urlString)) {
            return VideoType.VIMEO;
        } else {
            return -1;
        }
    }

    onSubmit() {
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
        this.videoMode = VideoType.NONE;
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

        this.validateVideoLink();
        this.videoMode = this.getVideoType(newVal);
        var startTime = this.model.startMin * 60 + this.model.startSec;

        if (this.videoMode == VideoType.YOUTUBE) {
            var code = this.getParameterByName('v', newVal);
            this.videoPlayer.loadAndPause(code, startTime);
            this.thumbUrl = 'http://img.youtube.com/vi/' + code + '/0.jpg';
            this.hideThumb = false;
        } else if (this.videoMode == VideoType.VIMEO) {
            var ar = newVal.split('/');
            var code = ar[ar.length-1];
            this.thumbUrl = '../../assets/img/over_big.png';
            this.vimeoPlayer.loadVideo(code, startTime);
            this.hideThumb = false;
        }
    }

    onYTReady(flag:boolean) {
        console.log(flag);
        this.playerReady = true;
    }

    onVimeoEditLoaded(flag:boolean) {
        debugger;
        this.playerReady = true;
        this.vimeoPlayer.initVimeoPlayer(59777392, 0, false);
    }

    onThumbClick() {
        if (this.model.link !== '' && !this.hideThumb) {
            this.hideThumb = true;
            if (this.videoMode == VideoType.YOUTUBE) {
                this.videoPlayer.play();
            } else if (this.videoMode == VideoType.VIMEO) {
                this.vimeoPlayer.playVideo();
            }
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

    matchVimeo(url) {
        var p = /^https?:\/\/vimeo.com/;
        var res = (p).test(url);
        return res;
    }

}

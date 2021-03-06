import {Component, ViewChild, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES} from 'ng2-file-upload/ng2-file-upload';

import {OutputMessage} from './outputMessage';
import {StudyService} from '../../../shared/service/study.service';
import {YTEmbedComponent} from '../../../shared/youtube-embed-component/youtubeEmbedComponent';
import {Study} from '../../../shared/model/study';
import {VimeoEmbedComponent} from '../../../shared/vimeo-embed-component/vimeoEmbedComponent';
import {VideoType} from '../../../shared/model/videoType';
import {FileUploadProvider} from "../../../shared/file-upload/fileUploadProvider";

@Component({
    moduleId: module.id,
    selector: 'ti-admin-study-edit',
    templateUrl: 'studyEditComponent.html',
    styleUrls: ['studyEditComponent.css'],
    providers: [StudyService],
    directives: [
        FILE_UPLOAD_DIRECTIVES,
        <any>NgClass,
        <any>NgStyle,
        <any>YTEmbedComponent,
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        <any>VimeoEmbedComponent
    ]
})
export class StudyEditComponent implements OnInit {

    @ViewChild(<any>YTEmbedComponent) videoPlayer:YTEmbedComponent;
    @ViewChild(<any>VimeoEmbedComponent) vimeoPlayer:VimeoEmbedComponent;
    @Output() onStudiesUpdated = new EventEmitter<OutputMessage>();

    thumbUrl:string = '../../assets/img/over_big.png';

    uploader:FileUploadProvider;
    createMode:boolean;
    playerReady:boolean = false;
    hideThumb = false;
    videoMode:VideoType = VideoType.NONE;

    model = new Study(null, new Date().getTime(), '', '', '', '', 0, 0);

    constructor(private studyService:StudyService, private http:Http, private router:Router) {
        this.uploader = new FileUploadProvider({
            url: '/api/admin/study/import',
            autoUpload: true,
            allowedFileType: ['xls']
        });
        this.uploader.successHandler.subscribe(data =>
            this.onStudiesUpdated.emit(new OutputMessage(true, data.fileName + ' imported successfully')));
        this.uploader.errorHandler.subscribe(data =>
            this.onStudiesUpdated.emit(new OutputMessage(false, data.fileName + ' import error')));
    }

    ngOnInit() {
        this.createMode = true;
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

    onSubmit(v) {
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
        if (this.videoPlayer.player) {
            this.videoPlayer.stop();
            this.videoPlayer.loadAndPause(null);
        }
        if (this.vimeoPlayer.player) {
            this.vimeoPlayer.stopVideo();
        }
        this.createMode = true;
        this.thumbUrl = '../../assets/img/over_big.png';
        this.hideThumb = false;
        this.videoMode = VideoType.NONE;
        this.model = new Study(null, new Date().getTime(), '', '', '', '', 0, 0);
    }

    public editStudy(study:Study) {
        this.onClear();
        if (this.playerReady) {
            this.model = study;
            this.createMode = false;
            if (this.model.link) {
                this.updateVideo(this.model.link);
            }
        }
    }

    onChange(newVal) {
        this.validateVideoLink();
        this.updateVideo(newVal);
    }

    updateVideo(newVal) {
        this.videoMode = this.getVideoType(newVal);
        var startTime = this.model.startMin * 60 + this.model.startSec;

        if (this.videoMode == VideoType.YOUTUBE) {
            let code = this.getParameterByName('v', newVal);
            if (code.length > 11) {
                code = code.substr(0, 11);
            }
            if (code) {
                setTimeout(() => {
                    if (!this.videoPlayer.player) {
                        this.videoPlayer.initYoutube(code, startTime, true);
                    } else {
                        this.videoPlayer.loadAndPause(code, startTime);
                    }
                    this.thumbUrl = 'http://img.youtube.com/vi/' + code + '/0.jpg';
                }, 500);
            }
            this.hideThumb = false;
        } else if (this.videoMode == VideoType.VIMEO) {
            let ar = newVal.split('/');
            let code = ar[ar.length - 1];
            this.getVimeoThumb(code);
            setTimeout(() => {
                if (!this.vimeoPlayer.player) {
                    this.vimeoPlayer.initVimeoPlayer(code, startTime, false);
                } else {
                    this.vimeoPlayer.loadVideo(code, startTime, false);
                }
                this.hideThumb = false;
            }, 500);
        }
    }

    onYTReady(flag:boolean) {
        console.log(flag);
        this.playerReady = true;
    }

    onVimeoEditLoaded(flag:boolean) {
        this.playerReady = true;
        //this.vimeoPlayer.initVimeoPlayer(59777392, 0, false);
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

    getVimeoThumb(id:string) {
        // let url = 'http://vimeo.com/api/v2/video/' + id + '.json';
        // https://developer.vimeo.com/apis/oembed
        let url = 'https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/' + id;
        this.http.get(url)
            .map(res => res.json())
            .subscribe(
                data => {
                    this.thumbUrl = data['thumbnail_url'];
                },
                err => console.log(err),
                () => console.log('Vimeo Thumb')
            );
    }

    onSlides() {
        this.router.navigate(['admin/slide']);
    }

}

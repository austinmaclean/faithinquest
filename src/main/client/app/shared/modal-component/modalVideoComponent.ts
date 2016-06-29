import {Component, ViewChild, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {Study} from '../model/study';
import {YTEmbedComponent} from '../youtube-embed-component/youtubeEmbedComponent';
import {VimeoEmbedComponent} from '../vimeo-embed-component/vimeoEmbedComponent';
import {VideoType} from '../model/videoType';

@Component({
    moduleId: module.id,
    selector: 'ti-modal-video',
    templateUrl: 'modalVideoComponent.html',
    styleUrls: ['modalVideoComponent.css'],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, CORE_DIRECTIVES, <any>YTEmbedComponent, <any>VimeoEmbedComponent],
})
export class ModalVideoComponent {

    @ViewChild('lgModal') lgModal;
    @ViewChild(<any>YTEmbedComponent) videoPlayer:YTEmbedComponent;
    @ViewChild(<any>VimeoEmbedComponent) vimeoPlayer:VimeoEmbedComponent;

    @Output() onShown = new EventEmitter<any>();
    @Output() onHide = new EventEmitter<any>();

    study:Study = null;
    playerReady:boolean;
    vimeoReady:boolean;
    playing:boolean = false;

    videoMode:VideoType = VideoType.NONE;

    showModal(study:Study) {
        this.study = study;

        if (this.matchYoutubeUrl(this.study.link)) {
            this.videoMode = VideoType.YOUTUBE;
        } else if (this.matchVimeo(this.study.link)) {
            this.videoMode = VideoType.VIMEO;
        }

        if (this.lgModal) {
            this.lgModal.show();

            var flag:boolean = (this.playerReady && this.videoMode == VideoType.YOUTUBE) || (this.vimeoReady && this.videoMode == VideoType.VIMEO);

            if (flag && !this.playing) {
                this.playVideo();
            }
        }
    }

    onShownHandler() {
        console.log('shown');
        this.onShown.emit(this.study);
    }

    onHideHandler() {
        console.log('hide');
        if (this.videoMode == VideoType.YOUTUBE) {
            this.videoPlayer.stop();
            this.videoPlayer.loadAndPause(null);
        } else {
            this.vimeoPlayer.stopVideo();
        }

        this.onHide.emit(this.study);

        this.playing = false;
        this.study = null;
    }

    onYTReady(flag:boolean) {
        this.playerReady = true;
    }

    onVimeoLoaded(flag:boolean) {
        this.vimeoReady = true;
    }

    playVideo() {
        if (this.study) {
            var startTime = this.study.startMin * 60 + this.study.startSec;
            if (this.videoMode == VideoType.YOUTUBE) {
                setTimeout(() => {
                    var code = this.getParameterByName('v', this.study.link);
                    if (code.length > 11) {
                        code = code.substr(0, 11);
                    }
                    this.videoPlayer.playVideo(code, startTime);
                    this.playing = true;
                }, 500);
            } else {
                setTimeout(() => {
                    var ar = this.study.link.split('/');
                    var code = ar[ar.length - 1];
                    if (!this.vimeoPlayer.player) {
                        this.vimeoPlayer.initVimeoPlayer(code, startTime, true);
                    } else {
                        this.vimeoPlayer.loadVideo(code, startTime, true);
                    }
                    this.playing = true;
                }, 500);
            }
        }
    }

    close() {
        this.lgModal.hide();
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

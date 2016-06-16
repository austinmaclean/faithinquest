import {Component, ViewChild} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {Study} from '../model/study';
import {YTEmbedComponent} from '../youtube-embed-component/youtubeEmbedComponent';

@Component({
    moduleId: module.id,
    selector: 'modal-component',
    templateUrl: 'modalVideoComponent.html',
    styleUrls: ['modalVideoComponent.css'],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, CORE_DIRECTIVES, <any>YTEmbedComponent],
})
export class ModalVideoComponent {

    @ViewChild('lgModal') lgModal;
    @ViewChild(<any>YTEmbedComponent) videoPlayer:YTEmbedComponent;

    study:Study = null;
    playerReady:boolean;
    playing:boolean = false;

    showModal(study:Study) {

        this.study = study;
        if (this.lgModal) {
            this.lgModal.show();

            if (this.playerReady && !this.playing) {
                this.playVideo();
            }
        }
    }

    onYTReady(flag:boolean) {
        console.log(flag);
        this.playerReady = true;
        if (this.study && !this.playing) {
            this.playVideo();
        }
    }

    playVideo() {
        setTimeout(() => {
            var code = this.getParameterByName('v', this.study.link);
            var startTime = this.study.startMin * 60 + this.study.startSec;
            this.videoPlayer.playVideo(code, startTime);
            this.playing = true;
        }, 500);
    }

    close() {
        this.videoPlayer.stop();
        this.videoPlayer.loadAndPause(null);
        this.study = null;
        this.playing = false;
        this.lgModal.hide();
    }

    getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

}

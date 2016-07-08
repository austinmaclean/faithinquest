import { Component, OnInit, OnChanges, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import {LoadScript} from '../load-script/loadScript';

@Component({
    moduleId: module.id,
    selector: 'ti-yt-embed',
    template: '<div id="player-{{id}}"></div>'
})

export class YTEmbedComponent implements OnInit, OnChanges {

    public ready : boolean = false;

    @Input() ytheight : number;
    @Input() ytwidth : number;
    @Input() ytid : number;
    @Input() videoid : string;

    @Output() onYTReady = new EventEmitter<boolean>();

    private height : number;
    private width : number;
    private id : number;
    private el : ElementRef;
    public player: YT.Player;
    private done : boolean = false;

    constructor (el: ElementRef) {
        this.el = el.nativeElement;
    }

    public initYoutube(id:string, start:number, pause:boolean) {
        this.id = this.ytid ? this.ytid : 0;
        this.height = this.ytheight ? Number(this.ytheight) : 270;
        this.width = this.ytwidth ? Number(this.ytwidth) : 480;

        var options : YT.PlayerOptions = {
            width: Math.floor(this.width),
            height: Math.floor(this.height)
        };

        setTimeout(() => {
            this.player = new YT.Player('player-'+this.id, options);
            this.player.addEventListener('onReady', <YT.EventHandler>((event: YT.EventArgs) =>
            {
                if (pause) {
                    this.loadAndPause(id, start);
                } else {
                    this.playVideo(id, start);
                }
            }));
            this.player.addEventListener('onPlayback', <YT.EventHandler>((event: YT.EventArgs) =>
                this.onPlayerPlayback(event)));
            this.player.addEventListener('onPlayerStateChange', <YT.EventHandler>((event: YT.EventArgs) =>
                this.onPlayerStateChange(event)));
            this.player.addEventListener('onError', <YT.EventHandler>((event: YT.EventArgs) =>
                this.onPlayerError(event)));
        },1000);
    }

    public playVideo (id: string, start: number = 0, end: number = 1000000000, quality: string = 'default') {
        var params : YT.VideoByIdParams = {
            videoId: id,
            startSeconds: start,
            endSeconds: end,
            suggestedQuality: quality
        };

        this.videoid = id;
        this.player.loadVideoById(params);
    }

    public loadAndPause (id: string, start: number = 0) {
        var params : YT.VideoByIdParams = {
            videoId: id,
            startSeconds: start,
            suggestedQuality: 'medium'
        };

        this.videoid = id;
        this.player.cueVideoById(params);
        this.player.pauseVideo();
    };

    onPlayerReady(event: YT.EventArgs) {
        console.log('player ready');
        this.ready = true;
    };

    onPlayerPlayback(event: YT.EventArgs) {
        console.log('playback');
        if (!this.videoid || this.videoid === '') {
            return;
        }
    };

    onPlayerStateChange(event: YT.EventArgs) {
        console.log('playing state:: '+event.data);
        if (event.data === YT.PlayerState.ENDED) {
            this.done = true;
        }
    }

    onPlayerError(event: YT.EventArgs) {
        console.log('playing error:: '+event.data);
    }

    ngOnInit() {
        console.log('init player container');
    }

    ngOnChanges(changes) {
        console.log(changes);

        if (typeof(YT) === 'undefined' || typeof(YT.Player) === 'undefined') {
            LoadScript.load('https://www.youtube.com/iframe_api', {async: false}, (err, script) => {
                this.onYTReady.emit(true);
            });
        } else {
        }
    }

    public play() {
        if (this.player) {
            this.player.playVideo();
        }
    }

    public stop() {
        if (this.player) {
            this.player.stopVideo();
        }
    }

    public clear() {
        if (this.player) {
            this.player.clearVideo();
        }
    }

}

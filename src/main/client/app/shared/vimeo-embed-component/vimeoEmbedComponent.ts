import { Component, OnInit, OnChanges, Input, ElementRef, provide, Output, EventEmitter } from '@angular/core';
import {LoadScript} from '../load-script/loadScript';
import timeout = Q.timeout;

@Component({
    moduleId: module.id,
    selector: 'ti-vimeo-embed',
    template: '<div id="vimeo-{{embed}}"></div>'
})

export class VimeoEmbedComponent implements OnChanges {

    @Input() vid : string;
    @Input() videoid : string;
    @Input() vwidth : number;
    @Input() vheight : number;
    @Output() onVimeoLoaded = new EventEmitter<boolean>();

    player : Vimeo.Player;

    autoplay:boolean = false;
    id: string;
    start: number = 0;
    embed : string;

    ngOnChanges(changes) {
        this.embed = this.vid ? this.vid : 'temp';

        if (this.videoid) {
            this.id = this.videoid;
        }

        if (typeof(Vimeo) === 'undefined' || typeof(Vimeo.Player) === 'undefined') {
            LoadScript.load('https://player.vimeo.com/api/player.js', {async: false}, (err, script) => {
                this.onVimeoLoaded.emit(true);
            });
        } else {
            this.onVimeoLoaded.emit(true);
        }
    }

    public loadVideo(id:string, start?:number, autoPlay?:boolean) {
        this.autoplay = autoPlay ? autoPlay : false;
        this.start = start ? start : 0;
        this.id = id;
        let self = this;
        this.player.loadVideo(id).then(id => {
            self.setTime();
        });
    }

    public initVimeoPlayer(id, start?:number, autoPlay?: boolean) {
        this.id = id;
        this.autoplay = autoPlay ? autoPlay : false;
        this.start = start ? start : 0;
        var options = {
            id: id,
            width: Math.floor(this.vwidth),
            height: Math.floor(this.vheight),
            quality: '360p'
        };

        this.player = new Vimeo.Player('vimeo-'+this.embed, options);
        this.player.on('loaded', <any>((event: any) =>
            this.onLoaded(event)));
        this.player.on('ready', <any>((event: any) =>
            this.onReady(event)));
        this.player.on('error', <any>((event: any) =>
            this.onError(event)));
        this.player.on('seeked', <any>((event: any) =>
            this.onTimeUpdate(event)));
        this.player.on('finish', <any>((event: any) =>
            this.onFinish(event)));

    }

    onFinish(event:any) {
    }

    onTimeUpdate(event:any) {
        if (this.autoplay) {
            this.player.play();
        }else{
            this.player.pause();
        }
    }

    onReady(event:any) {
        console.log('ready');
    }

    onError(event:any) {
        console.log(event);
    }

    setTime() {
        setTimeout(() => {
            this.player.setCurrentTime(this.start);
        }, 1000);
    }

    onLoaded(event:any) {
        this.setTime();
    }

    removePlayer() {
        this.player = null;
    }

    public stopVideo() {
        if (this.player) {
            this.autoplay = false;
            this.player.unload();
        }
    }

    public playVideo() {
        if (this.player) {
            this.player.play();
        }
    }

}
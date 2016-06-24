import { Component, OnInit, OnChanges, Input, ElementRef, provide, Output, EventEmitter } from '@angular/core';
import {LoadScript} from '../youtube-embed-component/loadScript';

@Component({
    moduleId: module.id,
    selector: 'ti-vimeo-embed',
    template: '<div id="vimeo-{{embed}}"></div>',
    providers: [Window]
})

export class VimeoEmbedComponent implements OnInit, OnChanges {

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

    ngOnInit() {
        console.log('init player container');
        //this.initYoutube();
    }

    ngOnChanges(changes) {
        console.log(changes);

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

    public loadVideo(id:string, start?:number = 0, autoPlay?:boolean = false) {
        this.autoplay = autoPlay;
        this.start = start;
        this.player.loadVideo(id);
    }

    public initVimeoPlayer(id, start?:number = 0, autoPlay?: boolean = false) {
        this.id = id;
        this.autoplay = autoPlay;
        this.start = start;
        var options = {
            id: id,
            width: this.vwidth,
            height: this.vheight
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

    onLoaded(event:any) {
        this.player.setCurrentTime(this.start);
    }

    public stopVideo() {
        this.autoplay = false;
        this.player.unload();
    }

    public playVideo() {
        this.player.play();
    }

}
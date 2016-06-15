import { Component, OnInit, OnChanges, Input, ElementRef, provide } from '@angular/core';

provide(Window, { useValue: window });

@Component({
    moduleId: module.id,
    selector: 'ti-yt-embed',
    template: '<div id="player"></div>',
    providers: [Window]
})

export class YTEmbedComponent implements OnInit, OnChanges {
    @Input() ytheight : number;
    @Input() ytwidth : number;
    @Input() ytid : number;
    @Input() videoid : string;

    private height : number;
    private width : number;
    private id : number;

    private el : ElementRef;

    private player: YT.Player;

    private ready : boolean = false;
    private done : boolean = false;

    constructor (el: ElementRef) {
        this.el = el.nativeElement;
    }

    initYoutube() {
        this.id = this.ytid ? this.ytid : 0;

        this.height = this.ytheight ? Number(this.ytheight) : 270;
        this.width = this.ytwidth ? Number(this.ytwidth) : 480;

        var options : YT.PlayerOptions = {width: this.width, height: this.height};

        setTimeout(() => {
            this.player = new YT.Player('player', options);
            this.player.addEventListener('onReady', <YT.EventHandler>((event: YT.EventArgs) =>
                this.onPlayerReady(event)));
            this.player.addEventListener('onPlayback', <YT.EventHandler>((event: YT.EventArgs) =>
                this.onPlayerPlayback(event)));
            this.player.addEventListener('onPlayerStateChange', <YT.EventHandler>((event: YT.EventArgs) =>
                this.onPlayerStateChange(event)));
            this.player.addEventListener('onError', <YT.EventHandler>((event: YT.EventArgs) =>
                this.onPlayerError(event)));
        },2000);
    }

    public playVideo (id: string, start: number = 0, end: number = 10000000000000, quality: string = 'medium') {
        if (this.ready) {

            var params : YT.VideoByIdParams = {
                videoId: id,
                startSeconds: start,
                endSeconds: end,
                suggestedQuality: quality
            };

            this.videoid = id;
            this.player.loadVideoById(params);
        }
    }

    onPlayerReady(event: YT.EventArgs) {
        console.log('player ready');
        this.ready = true;
    }

    onPlayerPlayback(event: YT.EventArgs) {
        console.log('playback');
        if (!this.videoid || this.videoid === '') {
            return;
        }
    }

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
        //this.initYoutube();
    }

    ngOnChanges(changes) {
        console.log(changes);
        this.initYoutube();
    }

}

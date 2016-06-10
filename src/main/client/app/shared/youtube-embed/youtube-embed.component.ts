import { Component, OnInit, Input, ElementRef, provide } from '@angular/core';

provide(Window, { useValue: window });

export class Player extends YT.Player {
    public container : YoutubeEmbedComponent;
}

@Component({
    moduleId: module.id,
    selector: 'sd-youtube-embed',
    template: '<div id="player"></div>',
    providers: [Window]
})

export class YoutubeEmbedComponent implements OnInit {
    @Input() height : number;
    @Input() width : number;
    @Input() videoid : string;

    private el : ElementRef;

    private player: Player;

    private ready : boolean = false;
    private done : boolean = false;

    constructor (el: ElementRef) {
        debugger;
        this.el = el.nativeElement;
        this.height = this.height ? this.height : 270;
        this.width = this.width ? this.width : 480;

    }

    initYoutube() {
        debugger;

        var options : YT.PlayerOptions = {width: this.width, height: this.height};

        this.player = new Player('player', options);
        this.player.container = this;
        this.player.addEventListener('onReady', <YT.EventHandler>this.onPlayerReady);
        this.player.addEventListener('onPlayback', <YT.EventHandler>this.onPlayerPlayback);
        this.player.addEventListener('onPlayerStateChange', <YT.EventHandler>this.onPlayerStateChange);
        this.player.addEventListener('onError', <YT.EventHandler>this.onPlayerError);

    }

    public playVideo (id: string, start: number = 0, end: number = 1000000000, quality: string = 'medium') {
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
        event.target['container'].ready = true;
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
            event.target['container'].done = true;
        }
    }

    onPlayerError(event: YT.EventArgs) {
        console.log('playing error:: '+event.data);
    }

    ngOnInit() {
        console.log('init player container');
        this.initYoutube();
    }

}

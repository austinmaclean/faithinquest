import { Component, OnInit, Input, ElementRef, provide , OnChanges} from '@angular/core';

provide(Window, { useValue: window });

export class Player extends YT.Player {
    public container : YTEmbedComponent;
}

@Component({
    moduleId: module.id,
    selector: 'ti-yt-embed',
    template: '<div id="player"></div>',
    providers: [Window]
})

export class YTEmbedComponent implements OnInit {
    @Input() ytheight : number;
    @Input() ytwidth : number;
    @Input() ytid : number;
    @Input() videoid : string;

    private height : number;
    private width : number;
    private id : number;

    private el : ElementRef;

    private player: Player;

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

        this.player = new Player('player', options);
        this.player.container = this;
        this.player.addEventListener('onReady', <YT.EventHandler>this.onPlayerReady);
        this.player.addEventListener('onPlayback', <YT.EventHandler>this.onPlayerPlayback);
        this.player.addEventListener('onPlayerStateChange', <YT.EventHandler>this.onPlayerStateChange);
        this.player.addEventListener('onError', <YT.EventHandler>this.onPlayerError);

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
        //this.initYoutube();
    }

    ngOnChanges(changes) {
        console.log(changes);
        this.initYoutube();
    }

}

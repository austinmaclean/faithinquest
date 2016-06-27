declare namespace Vimeo {
    export class Player {
        // Constructor
        constructor(id: string, playerOptions: PlayerOptions);

        //Methods
        on(event: string, callback: any);
        off(event:string, handler:any);
        loadVideo(id: string);
        ready()
        enableTextTrack(language: string, kind?: string);
        disableTextTrack();
        pause();
        play();
        unload();
        getAutopause();
        setAutopause(autopause: boolean);
        getColor();
        setColor(color: string);
        getCurrentTime();
        setCurrentTime(seconds: number);
        getDuration();
        getEnded();
        getLoop();
        setLoop(loop: boolean);
        getPaused();
        getTextTracks();
        getVideoEmbedCode();
        getVideoId()
        getVideoTitle()
        getVideoWidth()
        getVideoHeight()
        getVideoUrl()
        getVolume()
        setVolume(volume: number);
    }

    export interface Events {
        play;
        pause;
        ended;
        timeupdate;
        progress;
        seeked;
        texttrackchange;
        cuechange;
        volumechange;
        error;
        loaded;
    }

    export interface PlayerOptions {
        id?:number;
        url?:string;
        autopause?:boolean; //true
        autoplay?:boolean; //false
        byline?:boolean; //true
        color?:string; //00adef
        loop?:boolean; //false
        height?:number;
        maxheight?:number;
        maxwidth?:number;
        portrait?:boolean; //true
        title?:boolean; //true
        width?:number;
    }
}
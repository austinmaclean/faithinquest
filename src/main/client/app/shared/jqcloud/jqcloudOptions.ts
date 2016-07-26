export class JQCloudOptions {
    public width:number;
    public height:number;
    public center: any = {x: 0.5, y:0.5};
    public autoResize:boolean = false;
    public steps:number = 20;
    public classPattern:string = 'w{n}';
    public afterCloudRender:any = null;
    public delay:number = 0;
    public shape: string = 'elliptic';
    public removeOverflowing:boolean = true;
    public encodeURI:boolean = true;
    public colors: Array<string> = [];
    public fontSize: any = {from: 1, to: 2};

    constructor(width?:number,
                height?:number,
                center?:any,
                autoResize?:boolean,
                steps?:number,
                classPattern?:string,
                afterCloudRender?:any,
                delay?:number,
                shape?:string,
                removeOverflowing?:boolean,
                encodeURI?:boolean,
                colors?:Array<string>,
                fontSize?:any) {

        this.width = width;
        this.height = height;
        this.center = center;
        this.autoResize = autoResize;
        this.steps = steps;
        this.classPattern = classPattern;
        this.afterCloudRender = afterCloudRender;
        this.delay = delay;
        this.shape = shape;
        this.removeOverflowing = removeOverflowing;
        this.encodeURI = encodeURI;
        this.colors = colors;
        this.fontSize = fontSize;
    }
}
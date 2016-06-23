import {BaseModel} from './baseModel';

export class Study extends BaseModel {
    public created:number;
    public title:string;
    public description:string;
    public speaker:string;
    public link:string;
    public startMin:number;
    public startSec:number;

    constructor(id?:number,
                created?:number,
                title?:string,
                description?:string,
                speaker?:string,
                link?:string,
                startMin?:number,
                startSec?:number) {
        super(id);
        this.created = created;
        this.title = title;
        this.description = description;
        this.speaker = speaker;
        this.link = link;
        this.startMin = startMin;
        this.startSec = startSec;
    }
}


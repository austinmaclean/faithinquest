export class JQWord {
    public text:string = '';
    public weight:number = -1;
    public link:string = '';
    public handlers:any = {};

    constructor(text?:string,
                weight?:number,
                link?:string,
                handlers?:any) {

        this.text = text;
        this.weight = weight;
        this.link = link;
        this.handlers = handlers;
    }
}
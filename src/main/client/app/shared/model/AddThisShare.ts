export class AddThisShare {

    public code:string;
    public url:string;
    public title:string;
    public description:string;

    constructor(code?:string,
                url?:string,
                title?:string,
                description?:string) {

        this.code = code;
        this.url = url;
        this.title = title;
        this.description = description;
    }
}

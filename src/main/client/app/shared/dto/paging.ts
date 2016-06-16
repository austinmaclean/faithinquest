export enum Order {
    desc, asc
}

export class Paging {
    constructor(public limit:number,
                public offset:number,
                public order:Order,
                public sort:string) {
    }
}

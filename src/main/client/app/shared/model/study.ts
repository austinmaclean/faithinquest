export class Study {
    created : number;
    title : string;
    description : string;
    speaker : string;
    link : string;
    startMin : number;
    startSec : number;
}

export class StudyModel {
    constructor(
        public created : number,
        public title : string,
        public description : string,
        public speaker : string,
        public link : string,
        public startMin : number,
        public startSec : number
    ) {  }
}

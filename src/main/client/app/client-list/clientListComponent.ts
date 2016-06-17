import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {StudyService, FooterComponent, StudyListComponent} from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'ti-study-list',
    templateUrl: 'clientListComponent.html',
    styleUrls: ['clientListComponent.css'],
    providers: [StudyService],
    directives: [<any>StudyListComponent, <any>FooterComponent]
})

export class ClientListComponent implements OnInit {

    @Input() editmode:string;

    @ViewChild(<any>StudyListComponent) private studyListComponent:StudyListComponent;

    search:any = {
        pattern: null,
        patternOld: null,
        speaker: null,
        speakerOld: null
    };

    ngOnInit() {
        console.log('study init');
    }

    onSearch(speaker?:string) {
        if(speaker) {
            this.search.speaker = speaker;
            this.search.pattern = null;
        }
        if (this.search.pattern !== this.search.patternOld || this.search.speaker !== this.search.speakerOld) {
            this.search.patternOld = this.search.pattern;
            this.search.speakerOld = this.search.speaker;
            this.studyListComponent.getStudies(this.search.pattern, this.search.speaker);
        }
    }

    onSearchClear(fieldName:string) {
        this.search[fieldName] = null;
        this.onSearch();
    }

}

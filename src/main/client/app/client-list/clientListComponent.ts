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
        patternOld: null
    };

    ngOnInit() {
        console.log('study init');
    }

    onSearch() {
        if (this.search.pattern !== this.search.patternOld) {
            this.search.patternOld = this.search.pattern;
            this.studyListComponent.getStudies(this.search.pattern);
        }
    }

}

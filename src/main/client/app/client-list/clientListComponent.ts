import {Component, OnInit, ViewChild} from '@angular/core';

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

    pattern:string = null;

    @ViewChild(<any>StudyListComponent) private listComponent:StudyListComponent;

    ngOnInit() {
        console.log('study init');
    }

    onSearch() {
        this.listComponent.onPatternSearch(this.pattern);
    }

    onSearchPattern(outString:string) {
        this.pattern = outString;
    }
}

import {Component, ViewChild, OnInit} from '@angular/core';

import {FooterComponent,} from '../../shared/footer/footer.component';
import {StudyListComponent} from '../../shared/study-list-component/studyListComponent';

@Component({
    moduleId: module.id,
    selector: 'ti-home',
    templateUrl: 'homeComponent.html',
    styleUrls: ['homeComponent.css'],
    directives: [<any>StudyListComponent, <any>FooterComponent]
})
export class HomeComponent implements OnInit{

    pattern:string = null;

    trends:Array<any> = [];

    @ViewChild(<any>StudyListComponent) private listComponent:StudyListComponent;

    constructor() {
    }

    ngOnInit() {
    }

    onSearch() {
        this.listComponent.onPatternSearch(this.pattern);
    }

    onSearchPattern(outString:string) {
        setTimeout(() => {
            this.pattern = outString;
        });
    }

}

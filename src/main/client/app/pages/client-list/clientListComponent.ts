import {Component, OnInit, ViewChild} from '@angular/core';

import {StudyService} from '../../shared/service/study.service';
import {FooterComponent,} from '../../shared/footer/footer.component';
import {StudyListComponent} from '../../shared/study-list-component/studyListComponent';

@Component({
    moduleId: module.id,
    selector: 'client-list-component',
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

import {Component, ViewChild} from '@angular/core';

import {StudyService} from '../../shared/service/study.service';
import {FooterComponent,} from '../../shared/footer/footer.component';
import {StudyListComponent} from '../../shared/study-list-component/studyListComponent';

@Component({
    moduleId: module.id,
    selector: 'ti-home',
    templateUrl: 'homeComponent.html',
    styleUrls: ['homeComponent.css'],
    providers: [StudyService],
    directives: [<any>StudyListComponent, <any>FooterComponent]
})
export class HomeComponent {

    pattern:string = null;

    @ViewChild(<any>StudyListComponent) private listComponent:StudyListComponent;

    onSearch() {
        this.listComponent.onPatternSearch(this.pattern);
    }

    onSearchPattern(outString:string) {
        this.pattern = outString;
    }

}

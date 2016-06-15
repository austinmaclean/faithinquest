import {Component, OnInit, Input} from '@angular/core';
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

    @Input() editmode: string;

    ngOnInit() {
        console.log('study init');
    }

}

import {Component, Input} from '@angular/core';
import {Study} from '../../../shared/model/study';

@Component({
    moduleId: module.id,
    selector: 'sd-admin-study',
    templateUrl: 'admin-study.component.html',
    styleUrls: ['admin-study.component.css']
})

export class AdminStudyComponent {

    @Input() item:Study;

}

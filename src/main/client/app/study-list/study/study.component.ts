import {Component, Input} from '@angular/core';
import {Study} from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-study',
    templateUrl: 'study.component.html',
    styleUrls: ['study.component.css']
})

export class StudyComponent {

    @Input() item:Study;

}

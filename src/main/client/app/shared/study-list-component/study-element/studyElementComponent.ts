import {Component, Input} from '@angular/core';
import {Study} from '../../model/study';

@Component({
    moduleId: module.id,
    selector: 'ti-study',
    templateUrl: 'studyElementComponent.html',
    styleUrls: ['studyElementComponent.css']
})

export class StudyElementComponent {

    @Input() item:Study;
    @Input() viewMode: boolean;

}

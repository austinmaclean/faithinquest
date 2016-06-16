import {Component, Input, Host, forwardRef, Inject} from '@angular/core';
import {Study} from '../../model/study';
import {StudyListComponent} from '../studyListComponent';

@Component({
    moduleId: module.id,
    selector: 'ti-study',
    templateUrl: 'studyElementComponent.html',
    styleUrls: ['studyElementComponent.css']
})

export class StudyElementComponent {

    @Input() item:Study;
    @Input() editmode: boolean;

    //component: StudyListComponent;

    constructor(@Host() @Inject(forwardRef(() => StudyListComponent)) private component: StudyListComponent) {
        //this.component = component;
    }

    processStudy() {
        console.log(this.item);
        this.component.processStudy(this.item);
    }

    actionEdit() {
        this.processStudy();
    }

    actionDelete() {
        this.component.deleteStudy(this.item);
    }

    actionShare() {
        window.alert('share');
    }
}

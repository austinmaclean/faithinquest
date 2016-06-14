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

    studyListComponent: StudyListComponent;

    constructor(@Host() @Inject(forwardRef(() => StudyListComponent)) component: StudyListComponent) {
        this.studyListComponent = component;
    }

    playVideo() {
        console.log(this.item);
        this.studyListComponent.playVideo(this.item);
    }

    actionEdit() {
        window.alert('edit');
    }

    actionDelete() {
        window.alert('delete');
    }

    actionShare() {
        window.alert('share');
    }
}

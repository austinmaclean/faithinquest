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

    playVideo() {
        console.log(this.item);
        debugger;
        this.component.playVideo(this.item);
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

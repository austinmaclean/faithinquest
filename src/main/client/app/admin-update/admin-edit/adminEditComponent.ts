import {Component, ViewChild} from '@angular/core';
import { YTEmbedComponent } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'ti-admin-study-edit',
    templateUrl: 'adminEditComponent.html',
    styleUrls: ['adminEditComponent.css'],
    directives: [<any>YTEmbedComponent]
})

export class AdminEditComponent {

    @ViewChild (<any>YTEmbedComponent) videoPlayer:YTEmbedComponent;

    onSubmit() {
        //this.videoPlayer.playVideo('7L6zcVQIhBE', 30); //7L6zcVQIhBE //M7lc1UVf-VE
    }
}

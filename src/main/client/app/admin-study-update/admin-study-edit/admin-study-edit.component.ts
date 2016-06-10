import {Component, ViewChild} from '@angular/core';
import { YoutubeEmbedComponent } from '../../shared/youtube-embed/youtube-embed.component';

@Component({
    moduleId: module.id,
    selector: 'sd-admin-study-edit',
    templateUrl: 'admin-study-edit.component.html',
    styleUrls: ['admin-study-edit.component.css'],
    directives: [<any>YoutubeEmbedComponent]
})

export class AdminStudyEditComponent {

    @ViewChild (<any>YoutubeEmbedComponent) videoPlayer:YoutubeEmbedComponent;

    onSubmit() {
        this.videoPlayer.playVideo('7L6zcVQIhBE', 30, 4800); //7L6zcVQIhBE //M7lc1UVf-VE
    }
}

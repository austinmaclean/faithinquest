import {Component, Input, Host, forwardRef, Inject, OnInit, OnChanges} from '@angular/core';
import {Study} from '../../model/study';
import {StudyListComponent} from '../studyListComponent';

@Component({
    moduleId: module.id,
    selector: 'ti-study',
    templateUrl: 'studyElementComponent.html',
    styleUrls: ['studyElementComponent.css']
})

export class StudyElementComponent implements OnInit, OnChanges {

    @Input() item:Study;
    @Input() editmode: boolean;

    thumbUrl : string = '../../assets/img/over.png';

    constructor(@Host() @Inject(forwardRef(() => StudyListComponent)) private component: StudyListComponent) {
    }

    ngOnInit():any {
        console.log('init');
    }

    ngOnChanges(changes) {
        if (this.item) {
            var code = this.getParameterByName('v', this.item.link);
            if (code) {
                this.thumbUrl = 'http://img.youtube.com/vi/'+code+'/default.jpg'
            }
        }
    }

    viewVideo() {
        this.component.viewVideo(this.item);
    }

    actionEdit() {
        this.component.editStudy(this.item);
    }

    actionDelete() {
        this.component.deleteStudy(this.item);
    }

    actionShare() {
        window.alert('share');
    }

    getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

}

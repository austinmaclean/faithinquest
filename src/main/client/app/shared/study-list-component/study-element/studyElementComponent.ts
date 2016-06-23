import {Component, Input, Host, forwardRef, Inject, OnInit, OnChanges} from '@angular/core';
import {Study} from '../../model/study';
import {StudyListComponent} from '../studyListComponent';
import {AddThisComponent} from '../../../shared/addthis/addThisComponent';

@Component({
    moduleId: module.id,
    selector: 'ti-study',
    templateUrl: 'studyElementComponent.html',
    styleUrls: ['studyElementComponent.css'],
    directives: [<any>AddThisComponent]
})

export class StudyElementComponent implements OnInit, OnChanges {

    @Input() item:Study;
    @Input() editmode: boolean;

    thumbUrl : string = '../../assets/img/over.png';

    public share = {
        code: 'ra-5768d6ade5563361',
        url: '',
        title: '',
        description: ''
    };

    constructor(@Host() @Inject(forwardRef(() => StudyListComponent)) private component: StudyListComponent) {
    }

    ngOnInit():any {
    }

    ngOnChanges(changes) {
        if (this.item) {
            var code = this.getParameterByName('v', this.item.link);
            if (code) {
                this.thumbUrl = 'http://img.youtube.com/vi/'+code+'/default.jpg';
            }
            this.share.url = this.item.link;
            this.share.title = this.item.title;
            this.share.description = this.item.description;
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
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

}

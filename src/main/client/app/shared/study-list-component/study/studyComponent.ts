import {Component, Input, Host, forwardRef, Inject, OnChanges} from '@angular/core';
import {Http} from '@angular/http';
import {Study} from '../../model/study';
import {StudyListComponent} from '../studyListComponent';
import {AddThisComponent} from '../../../shared/addthis/addThisComponent';
import {VideoType} from '../../model/videoType';
import {AddThisShare} from '../../model/AddThisShare';

@Component({
    moduleId: module.id,
    selector: 'ti-study',
    templateUrl: 'studyComponent.html',
    styleUrls: ['studyComponent.css'],
    directives: [<any>AddThisComponent]
})

export class StudyComponent implements OnChanges {

    @Input() item:Study;
    @Input() editMode:boolean;

    thumbUrl:string = '../../assets/img/over.png';

    videoMode = VideoType.NONE;

    public share:AddThisShare = new AddThisShare(AppConfig.addThisKey, '', '', '');

    constructor(@Host() @Inject(forwardRef(() => StudyListComponent)) private component:StudyListComponent, private http:Http) {
    }

    ngOnChanges(changes) {
        if (this.item) {

            if (this.matchYoutubeUrl(this.item.link)) {
                this.videoMode = VideoType.YOUTUBE;
                var code = this.getParameterByName('v', this.item.link);
                if (code) {
                    this.thumbUrl = 'https://img.youtube.com/vi/' + code + '/hqdefault.jpg';
                }
            } else if (this.matchVimeo(this.item.link)) {
                this.videoMode = VideoType.VIMEO;
                var ar = this.item.link.split('/');
                var code = ar[ar.length - 1];
                this.getVimeoThumb(code);
            }
            this.share.url = this.item.link;
            this.share.title = 'Got my answer to my question at faithinquest.com! Watch "'+this.item.title +'"';
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

    getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    getVimeoThumb(id:string) {
        let url = 'http://vimeo.com/api/v2/video/' + id + '.json';
        this.http.get(url)
            .map(res => res.json())
            .subscribe(
                data => this.updateThumbUrl(data),
                err => this.logError(err),
                () => console.log('Vimeo Thumb')
            );
    }

    updateThumbUrl(data) {
        this.thumbUrl = data[0].thumbnail_medium;
    }

    logError(err) {
        debugger;
        console.log(err);
    }

    matchYoutubeUrl(url) {
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(p)) {
            return url.match(p)[1];
        }
        return false;
    }

    matchVimeo(url) {
        var p = /^https?:\/\/vimeo.com/;
        var res = (p).test(url);
        return res;
    }

}

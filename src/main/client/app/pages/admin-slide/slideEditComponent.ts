import {Component, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {SlideService} from "../../shared/service/slide.service";
import {ArrayObservable} from 'rxjs/observable/ArrayObservable';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {FILE_UPLOAD_DIRECTIVES} from 'ng2-file-upload/ng2-file-upload';
import {FileUploadProvider} from "../../shared/file-upload/fileUploadProvider";

@Component({
    moduleId: module.id,
    selector: 'ti-slide-edit',
    templateUrl: 'slideEditComponent.html',
    styleUrls: ['slideEditComponent.css'],
    viewProviders: [<any>SlideService],
    directives: [
        FILE_UPLOAD_DIRECTIVES,
        <any>NgClass,
        <any>NgStyle,
        DND_DIRECTIVES,
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
    ]
})
export class SlideEditComponent implements OnDestroy {

    sub:any = null;
    slide:any = null;
    slides:any[] = [];

    uploader:FileUploadProvider;

    constructor(private route:ActivatedRoute, private router:Router, private slideService:SlideService) {

        ArrayObservable.of(1, 2, 3, 4, 5, 6).subscribe((res) => {
            this.slides.push({
                link: '',
                attachment: null,
                indexNumber: res
            });
        });

        this.slide = {
            link: '',
            attachment: null,
            indexNumber: 0
        };

        this.uploader = new FileUploadProvider({
            url: '/api/admin/attach',
            autoUpload: true,
            allowedFileType: ['image']
        });
        this.uploader.successHandler.subscribe(data => {
            debugger;
        });
        this.uploader.errorHandler.subscribe(data => {
            debugger;
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onBack() {
        this.router.navigate(['admin']);
    }

    add() {

    }

    reset() {

    }

    transferSuccess($event) {

    }

    public hasBaseDropZoneOver:boolean = false;

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }
}

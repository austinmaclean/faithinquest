import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {FILE_UPLOAD_DIRECTIVES} from 'ng2-file-upload/ng2-file-upload';
import {FileUploadProvider} from "../../../shared/file-upload/fileUploadProvider";
import {SlideService} from "../../../shared/service/slide.service";

@Component({
    moduleId: module.id,
    selector: 'ti-slide',
    templateUrl: 'slideComponent.html',
    styleUrls: ['slideComponent.css'],
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
export class SlideComponent implements OnInit, OnDestroy {

    uploader:FileUploadProvider;

    @Input() item:any;
    @Input() addMode:boolean;

    constructor(private route:ActivatedRoute, private router:Router, private slideService:SlideService) {
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

    ngOnInit() {
        if (this.addMode) {
            this.item = {
                link: '',
                attachment: null,
                indexNumber: 0
            };
        }
    }

    ngOnDestroy() {
        // none
    }

    onRemove() {
        
    }

    public hasBaseDropZoneOver:boolean = false;

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }
}

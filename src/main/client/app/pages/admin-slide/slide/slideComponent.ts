import {Component, Input, Host, forwardRef, Inject, OnInit} from "@angular/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from "@angular/common";
import {FILE_UPLOAD_DIRECTIVES, FileUploaderOptions} from "ng2-file-upload/ng2-file-upload";
import {FileUploadProvider} from "../../../shared/file-upload/fileUploadProvider";
import {SlideService} from "../../../shared/service/slide.service";
import {SlideEditComponent} from "../slideEditComponent";

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
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
    ]
})
export class SlideComponent implements OnInit {

    private uploader:FileUploadProvider;
    private itemTmp:any = {};

    edit:boolean = false;

    loading:boolean = false;

    @Input() item:any;
    @Input() addMode:boolean;

    constructor(@Host() @Inject(forwardRef(() => SlideEditComponent)) private component:SlideEditComponent) {
    }

    createItem() {
        return {
            link: '',
            attachment: null,
            indexNumber: 0
        }
    }

    ngOnInit() {
        if (this.addMode) {
            this.item = this.createItem();
        }
        this.uploader = new FileUploadProvider({
            url: '/api/admin/attach',
            autoUpload: true,
            allowedFileType: ['image']
        });
        this.uploader.successHandler.subscribe(data => {

            if (!this.edit) {
                this.onEdit();
            }
            this.loading = false;
            this.item.attachment = data.attachment;

        });

        this.uploader.errorHandler.subscribe(data => {
            this.loading = false;
            this.item.attachment = null;
        });

        this.uploader.beforeUploadHandler.subscribe(data => {
            this.loading = true;
        });

        this.uploader.progressHandler.subscribe(progress => {
            console.log(progress);
        })

    }

    attachURL():string {
        return this.item.attachment ? SlideService.attachURL(this.item.attachment) : '';
    };

    onRemove() {
        this.component.onRemoveItem(this.item);
    }

    onEdit() {
        Object.assign(this.itemTmp, this.item);
        this.item.attachment = null;
        this.edit = true;

        if (!this.addMode) {
            this.component.onEditOn(this.item.id);
        }
    }

    onCancel() {
        if (!this.addMode) {
            this.component.onEditOff(this.item.id);
        }

        this.edit = false;
        Object.assign(this.item, this.itemTmp);
    }

    onSave() {
        if (!this.addMode) {
            this.component.onEditOff(this.item.id);
        }

        this.edit = false;

        if (!this.addMode && this.item.attachment == null) {
            this.item.attachment = this.itemTmp.attachment;
            this.component.onEditOff(this.item.id);
        }

        this.component.onSaveItem(this.item, this.addMode);

        if (this.addMode) {
            this.item = this.createItem();
        }
    }

    public hasBaseDropZoneOver:boolean = false;

    public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
    }
}

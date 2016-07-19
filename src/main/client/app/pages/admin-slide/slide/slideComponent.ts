import {Component, Input, Host, forwardRef, Inject, OnInit} from "@angular/core";
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from "@angular/common";
import {DND_DIRECTIVES} from "ng2-dnd/ng2-dnd";
import {FILE_UPLOAD_DIRECTIVES} from "ng2-file-upload/ng2-file-upload";
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
        DND_DIRECTIVES,
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
    ]
})
export class SlideComponent implements OnInit {

    private uploader:FileUploadProvider;
    private itemTmp:any = {};

    edit:boolean = false;

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
            this.onEdit();
            this.item.attachment = data.attachment;
        });
    }

    attachURL():string {
        return this.item.attachment ? SlideService.attachURL(this.item.attachment) : '';
    };

    onRemove() {
        this.component.onRemoveItem(this.item);
    }

    onEdit() {
        Object.assign(this.itemTmp, this.item);
        this.edit = true;
    }

    onCancel() {
        this.edit = false;
        Object.assign(this.item, this.itemTmp);
    }

    onSave() {
        this.edit = false;
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

import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminEditComponent} from './admin-edit/adminEditComponent';
import {StudyListComponent} from '../shared/study-list-component/studyListComponent';
import {FooterComponent} from '../shared/footer/footer.component';
import {Study} from "../shared/model/study";
import {ModalMessageComponent} from "../shared/modal-component/modalMessageComponent";
import {DialogObject, ModalDialogComponent} from "../shared/modal-component/modalDialogComponent";


@Component({
    moduleId: module.id,
    selector: 'ti-admin-study-update',
    templateUrl: 'adminUpdateComponent.html',
    styleUrls: ['adminUpdateComponent.css'],
    directives: [<any>StudyListComponent, <any>AdminEditComponent, <any>FooterComponent, <any>ModalMessageComponent, <any>ModalDialogComponent]
})

export class AdminUpdateComponent implements OnInit {

    @ViewChild(<any>AdminEditComponent) private editComponent : AdminEditComponent;
    @ViewChild(<any>StudyListComponent) private listComponent : StudyListComponent;
    @ViewChild(<any>ModalMessageComponent) private messageComponent : ModalMessageComponent;
    @ViewChild(<any>ModalDialogComponent) private dialogComponent : ModalDialogComponent;

    ngOnInit() {
        console.log('init');
    }

    public editStudy (study: Study) {
        this.editComponent.editStudy(study);
    }

    public onStudyUpdated(message: string) {
        this.listComponent.getStudies();
        this.messageComponent.showModal(message);
    }
    
    public deleteStudy(study:Study) {
        var data: DialogObject = new DialogObject();
        data.message = 'Delete study "'+study.title+'"?';
        data.data = study;
        this.dialogComponent.showModal(data);
    }
    
    public onDeleteOk(data:DialogObject) {
        this.editComponent.deleteStudy(<Study>data.data);
    }
}

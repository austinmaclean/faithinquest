import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminEditComponent} from './admin-edit/adminEditComponent';
import {StudyListComponent} from '../shared/study-list-component/studyListComponent';
import {FooterComponent} from '../shared/footer/footer.component';
import {Study} from '../shared/model/study';
import {ModalMessageComponent} from '../shared/modal-component/modalMessageComponent';
import {ModalResult, ModalAction, ModalDialogComponent} from '../shared/modal-component/modalDialogComponent';


@Component({
    moduleId: module.id,
    selector: 'ti-admin-study-update',
    templateUrl: 'adminUpdateComponent.html',
    styleUrls: ['adminUpdateComponent.css'],
    directives: [<any>StudyListComponent, <any>AdminEditComponent, <any>FooterComponent,
        <any>ModalMessageComponent, <any>ModalDialogComponent]
})

export class AdminUpdateComponent implements OnInit {

    pattern : string = null;

    @ViewChild(<any>AdminEditComponent) private editComponent : AdminEditComponent;
    @ViewChild(<any>StudyListComponent) private listComponent : StudyListComponent;
    @ViewChild(<any>ModalMessageComponent) private messageComponent : ModalMessageComponent;
    @ViewChild(<any>ModalDialogComponent) private dialogComponent : ModalDialogComponent;

    ngOnInit() {
        console.log('init');
    }

    onSearch() {
        this.listComponent.onPatternSearch(this.pattern);
    }

    onSearchPattern(outString : string) {
        this.pattern = outString;
    }

    public editStudy (study: Study) {
        this.editComponent.editStudy(study);
    }

    public onStudyUpdated(message: string) {
        this.listComponent.getStudies();
        this.messageComponent.showModal(message);
    }

    public deleteStudy(study:Study) {
        var modalData = <ModalResult>{};
        modalData.type = 'deleteStudy';
        modalData.message = 'Delete study "'+study.title+'"?';
        modalData.data = study;
        this.dialogComponent.showModal(modalData);
    }

    public onProcessModal(res:ModalResult) {
        if (res.action === ModalAction.OK && res.type === 'deleteStudy') {
            this.editComponent.deleteStudy(<Study>res.data);
        }
    }
}

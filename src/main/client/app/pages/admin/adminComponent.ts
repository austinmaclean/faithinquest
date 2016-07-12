import {Component, ViewChild} from '@angular/core';
import {StudyEditComponent} from './study-edit/studyEditComponent';
import {OutputMessage} from './study-edit/outputMessage';
import {StudyListComponent} from '../../shared/study-list-component/studyListComponent';
import {FooterComponent} from '../../shared/footer/footer.component';
import {Study} from '../../shared/model/study';
import {ModalMessageComponent} from '../../shared/modal-component/modalMessageComponent';
import {ModalResult, ModalAction, ModalDialogComponent} from '../../shared/modal-component/modalDialogComponent';
import {CrazyEgg} from "../../shared/crazy-egg/crazyEgg";

@Component({
    moduleId: module.id,
    selector: 'ti-admin',
    templateUrl: 'adminComponent.html',
    styleUrls: ['adminComponent.css'],
    directives: [
        <any>StudyListComponent,
        <any>StudyEditComponent,
        <any>FooterComponent,
        <any>ModalMessageComponent,
        <any>ModalDialogComponent
    ],
    providers: [<any>CrazyEgg]
})

export class AdminComponent {

    pattern:string = null;

    @ViewChild(<any>StudyEditComponent) private editComponent:StudyEditComponent;
    @ViewChild(<any>StudyListComponent) private listComponent:StudyListComponent;
    @ViewChild(<any>ModalMessageComponent) private messageComponent:ModalMessageComponent;
    @ViewChild(<any>ModalDialogComponent) private dialogComponent:ModalDialogComponent;

    onSearch() {
        this.listComponent.onPatternSearch(this.pattern);
    }

    onSearchPattern(outString:string) {
        this.pattern = outString;
    }

    public editStudy(study:Study) {
        this.editComponent.editStudy(study);
    }

    public onStudyUpdated(data:OutputMessage) {
        if (data.reload) {
            this.listComponent.getStudies();
        }
        this.messageComponent.showModal(data.message);
    }

    public deleteStudy(study:Study) {
        var modalData = <ModalResult>{};
        modalData.type = 'deleteStudy';
        modalData.message = 'Delete study "' + study.title + '"?';
        modalData.data = study;
        this.dialogComponent.showModal(modalData);
    }

    public onProcessModal(res:ModalResult) {
        if (res.action === ModalAction.OK && res.type === 'deleteStudy') {
            this.editComponent.deleteStudy(<Study>res.data);
        }
    }
}

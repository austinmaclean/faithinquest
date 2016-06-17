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
    directives: [<any>StudyListComponent, <any>AdminEditComponent, <any>FooterComponent, <any>ModalMessageComponent, <any>ModalDialogComponent]
})

export class AdminUpdateComponent implements OnInit {

    @ViewChild(<any>AdminEditComponent) private editComponent : AdminEditComponent;
    @ViewChild(<any>StudyListComponent) private listComponent : StudyListComponent;
    @ViewChild(<any>ModalMessageComponent) private messageComponent : ModalMessageComponent;
    @ViewChild(<any>ModalDialogComponent) private dialogComponent : ModalDialogComponent;

    search:any = {
        pattern: null,
        patternOld: null,
        speaker: null,
        speakerOld: null
    };

    ngOnInit() {
        console.log('init');
    }

    onSearch(speaker?:string) {
        if(speaker) {
            this.search.speaker = speaker;
            this.search.pattern = null;
        }
        if (this.search.pattern !== this.search.patternOld || this.search.speaker !== this.search.speakerOld) {
            this.search.patternOld = this.search.pattern;
            this.search.speakerOld = this.search.speaker;
            this.listComponent.getStudies(this.search.pattern, this.search.speaker);
        }
    }

    onSearchClear(fieldName:string) {
        this.search[fieldName] = null;
        this.onSearch();
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
        if (res.action == ModalAction.OK && res.type == 'deleteStudy') {
            this.editComponent.deleteStudy(<Study>res.data);
        }
    }
    
}

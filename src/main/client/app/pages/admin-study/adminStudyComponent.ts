import {Component, ViewChild} from '@angular/core';
import {StudyEditComponent} from '../admin-study/study-edit/studyEditComponent';
import {OutputMessage} from '../admin-study/study-edit/outputMessage';
import {StudyListComponent} from '../../shared/study-list-component/studyListComponent';
import {FooterComponent} from '../../shared/footer/footer.component';
import {Study} from '../../shared/model/study';
import {ModalMessageComponent} from '../../shared/modal-component/modalMessageComponent';
import {ModalResult, ModalAction, ModalDialogComponent} from '../../shared/modal-component/modalDialogComponent';
import {CrazyEgg} from "../../shared/crazy-egg/crazyEgg";
import {JQCloud} from "../../shared/jqcloud/jqcloud";
import {TagsService} from "../../shared/service/tags.service";

@Component({
    moduleId: module.id,
    selector: 'ti-admin-study',
    templateUrl: 'adminStudyComponent.html',
    styleUrls: ['adminStudyComponent.css'],
    directives: [
        <any>StudyListComponent,
        <any>StudyEditComponent,
        <any>FooterComponent,
        <any>ModalMessageComponent,
        <any>ModalDialogComponent,
        <any>JQCloud
    ],
    providers: [<any>CrazyEgg, TagsService]
})

export class AdminStudyComponent {

    pattern:string = null;

    @ViewChild(<any>StudyEditComponent) private editComponent:StudyEditComponent;
    @ViewChild(<any>StudyListComponent) private listComponent:StudyListComponent;
    @ViewChild(<any>ModalMessageComponent) private messageComponent:ModalMessageComponent;
    @ViewChild(<any>ModalDialogComponent) private dialogComponent:ModalDialogComponent;

    words:Array<any> = [];

    constructor(private tagsService:TagsService) {
    }

    public tagSearch (tag:string) {
        this.pattern = tag;
        this.onSearch();
    }

    ngOnInit() {
        this.tagsService.get(20).subscribe(res => {
            this.words = [];
            res.result.forEach( (item) => {
                this.words.push({text: item.id, weight: item.amount, handlers:{click: () => {this.tagSearch(item.id)}}})
            });
        });
    }

    onSearch() {
        this.listComponent.onPatternSearch(this.pattern);
    }

    onSearchPattern(outString:string) {
        setTimeout(() => {
            this.pattern = outString;
        });
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

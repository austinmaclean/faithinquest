import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AdminStudyComponent} from '../admin-study/adminStudyComponent';
import {SlideEditComponent} from '../admin-slide/slideEditComponent';
import {FooterComponent} from '../../shared/footer/footer.component';
import {ModalMessageComponent} from '../../shared/modal-component/modalMessageComponent';
import {ModalDialogComponent} from '../../shared/modal-component/modalDialogComponent';
import {CrazyEgg} from "../../shared/crazy-egg/crazyEgg";

@Component({
    moduleId: module.id,
    selector: 'ti-admin',
    templateUrl: 'adminComponent.html',
    styleUrls: ['adminComponent.css'],
    directives: [
        <any>AdminStudyComponent,
        <any>SlideEditComponent,
        <any>FooterComponent,
        <any>ModalMessageComponent,
        <any>ModalDialogComponent,
        ROUTER_DIRECTIVES
    ],
    providers: [<any>CrazyEgg]
})

export class AdminComponent {

}

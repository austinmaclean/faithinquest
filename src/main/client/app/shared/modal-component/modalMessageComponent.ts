import {Component, ViewChild} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS, ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'ti-modal-message',
    templateUrl: 'modalMessageComponent.html',
    styleUrls: ['modalMessageComponent.css'],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, CORE_DIRECTIVES],
})

export class ModalMessageComponent {

    @ViewChild(<any>ModalDirective) smModal:ModalDirective;

    message : string = '';

    showModal(message:string) {

        this.message = message;
        if (this.smModal) {
            this.smModal.show();
        }
    }

    close () {
        this.message = '';
        this.smModal.hide();
    }

}

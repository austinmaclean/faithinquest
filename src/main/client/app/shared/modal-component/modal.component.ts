import {Component, ViewChild} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'modal-component',
    templateUrl: 'modalComponent.html',
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, CORE_DIRECTIVES],
})
export class ModalComponent {

    data:any = {
        id: 1
    };

    @ViewChild('lgModal') lgModal;

    showModal() {
        if (this.lgModal) {
            this.lgModal.show();
        }
    }
}
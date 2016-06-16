import {Component, ViewChild, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';

export class DialogObject {
    message: string;
    data: any;
}

@Component({
    moduleId: module.id,
    selector: 'ti-modal-dialog',
    templateUrl: 'modalDialogComponent.html',
    styleUrls: ['modalDialogComponent.css'],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTVES, CORE_DIRECTIVES],
})

export class ModalDialogComponent {

    @ViewChild('smModal') smModal;
    @Output() onOk = new EventEmitter<DialogObject>();

    data : DialogObject;

    showModal(data:DialogObject) {

        this.data = data;
        if (this.smModal) {
            this.smModal.show();
        }
    }

    close () {
        this.data = null;
        this.smModal.hide();
    }

    process () {
        this.onOk.emit(this.data);
        this.data = null;
        this.smModal.hide();
    }

}

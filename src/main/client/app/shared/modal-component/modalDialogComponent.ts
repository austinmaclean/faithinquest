import {Component, ViewChild, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';

export enum ModalAction { OK, CANCEL }

export interface ModalResult {
    action: ModalAction;
    message: string;
    type?: string;
    data?: any;
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

    @Output('closed') closeEmitter: EventEmitter<ModalResult> = new EventEmitter<ModalResult>();
    
    data : ModalResult;

    showModal(data:ModalResult) {

        this.data = data;
        if (this.smModal) {
            this.smModal.show();
        }
    }

    close () {
        this.data.action = ModalAction.CANCEL;
        this.closeEmitter.emit(this.data);
        this.data = null;
        this.smModal.hide();
    }

    process () {
        this.data.action = ModalAction.OK;
        this.closeEmitter.emit(this.data);
        this.data = null;
        this.smModal.hide();
    }

}

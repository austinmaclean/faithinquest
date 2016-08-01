import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';

import {ErrorMessagesEventEmitter} from '../notification/notification';

@Component({
    moduleId: module.id,
    selector: 'ti-message',
    templateUrl: 'messageComponent.html',
    styleUrls: ['messageComponent.css'],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [MODAL_DIRECTIVES, CORE_DIRECTIVES],
})

export class MessageComponent implements OnInit {

    messages = [];
    msgDuration = 5 * 1000;

    constructor(private errorMessagesEventEmitter:ErrorMessagesEventEmitter) {
    }

    ngOnInit() {
        this.errorMessagesEventEmitter.subscribe(messages => {
            this.showMsg({items: messages, type: 'danger'});
        });
    }

    hideHandler(index:number) {
        this.messages[index].timer = null;
        this.hideMsg(index);
    }

    hideHandlerExecutor(message:any) {
        for (var index = 0; index < this.messages.length; index++) {
            if (this.messages[index].timer == message.timer) {
                this.hideHandler(index);
                break;
            }
        }
    }

    showMsg(message:any) {
        if (this.msgDuration) {
            message.timer = setTimeout(() => {
                this.hideHandlerExecutor(message);
            }, this.msgDuration);
        }

        this.messages.push(message);
    }

    removeTimer(index:number) {
        var msg = this.messages[index];
        if (msg && msg.timer) {
            clearTimeout(msg.timer);
        }
    }

    hideMsg(index:number) {
        this.removeTimer(index);
        this.messages.splice(index, 1);
    }

    public closeAlertMessage(index:number) {
        this.hideMsg(index);
    }

    public showTrace(index:number, itemIndex:number) {
        this.removeTimer(index);
        var msg = this.messages[index];
        if (msg) {
            msg.items[itemIndex].traceOpen = !msg.items[itemIndex].traceOpen;
        }
    }

}

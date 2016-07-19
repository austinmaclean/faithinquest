import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle} from '@angular/common';
import {SlideService} from "../../shared/service/slide.service";
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {SlideComponent} from "./slide/slideComponent";

@Component({
    moduleId: module.id,
    selector: 'ti-slide-edit',
    templateUrl: 'slideEditComponent.html',
    styleUrls: ['slideEditComponent.css'],
    viewProviders: [<any>SlideService],
    directives: [
        <any>SlideComponent,
        <any>NgClass,
        <any>NgStyle,
        DND_DIRECTIVES,
        CORE_DIRECTIVES,
        FORM_DIRECTIVES,
    ]
})
export class SlideEditComponent implements OnInit {

    slides:any[] = [];

    constructor(private router:Router, private slideService:SlideService) {
    }

    ngOnInit() {
        this.slideService.get().subscribe(res => {
            this.slides = res.result;
        })
    }

    onBack() {
        this.router.navigate(['admin']);
    }

    onTransfer(item, index) {
        item.indexNumber = index;
        this.slideService.update(item).subscribe(res => {
            // none
        });
    }

    onSaveItem(item:any, addMode:boolean) {
        if (addMode) {
            this.slideService.create(item).subscribe(res => {
                this.slideService.get().subscribe(list => {
                    this.slides = list.result;
                })
            });
        } else {
            this.slideService.update(item).subscribe(res => {
                // none
            });
        }
    }

    onRemoveItem(item:any) {
        this.slideService.remove(item.id).subscribe(res => {
            this.slideService.get().subscribe(list => {
                this.slides = list.result;
            })
        });
    }
}

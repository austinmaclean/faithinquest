import {Component, OnInit, OnChanges, Input, ViewChild, Output, EventEmitter} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {Router, RouteParams, Instruction} from "@angular/router-deprecated";
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from "ng2-bootstrap/ng2-bootstrap";
import {Study} from "../../shared/model/study";
import {StudyService} from "../../shared/index";
import {StudyElementComponent} from "./study-element/studyElementComponent";
import {YTEmbedComponent} from "../youtube-embed-component/youtubeEmbedComponent";
import {ModalVideoComponent} from "../modal-component/modalVideoComponent";
import {InfiniteScroll} from "../infinite-scroll/infiniteScroll";
import {IScrollableResult, ScrollableResult} from "../infinite-scroll/scrollableResult";
import {QueryFilter} from "../infinite-scroll/queryFilter";
import {LoadScript} from "../youtube-embed-component/loadScript";

@Component({
    moduleId: module.id,
    selector: 'ti-study-list',
    templateUrl: 'studyListComponent.html',
    styleUrls: ['studyListComponent.css'],
    providers: [StudyService],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [<any>InfiniteScroll, <any>StudyElementComponent, <any>YTEmbedComponent, <any>ModalVideoComponent, MODAL_DIRECTVES, CORE_DIRECTIVES]
})

export class StudyListComponent implements OnInit, OnChanges {

    public list:Study[];

    @Input() editmode:boolean;

    @Output() onStudyEdit = new EventEmitter<Study>();
    @Output() onStudyDelete = new EventEmitter<Study>();
    @Output() onSearchPattern = new EventEmitter<string>();

    @ViewChild(<any>ModalVideoComponent) private component:ModalVideoComponent;

    queryFilter:QueryFilter;
    scrollableResult:IScrollableResult<Study>;

    constructor(private studyService:StudyService, private routeParams:RouteParams, private router:Router) {
        let filterConfig = {
            pattern: {value: null},
            speaker: {value: null},
            view: {value: null}
        };
        this.queryFilter = new QueryFilter(filterConfig, routeParams, router);
        let filterReq = this.queryFilter.makeFilterRequest();
        this.scrollableResult = new ScrollableResult<Study>((data)=> studyService.find(data), 10, filterReq, true, false);
    }

    ngOnInit() {
        this.loadWidget();

        if(this.queryFilter.filter.view.value != null) {
            // setTimeout(() => {
            //     this.studyService.read(this.queryFilter.filter.view.value).subscribe(study => {
            //         this.viewVideo(study);
            //     });
            // }, 1000);
        }
    }

    ngOnChanges(changes) {
        console.log('study component changes');
    }

    public onSelectSpeaker(speaker:string) {
        this.onSearch(speaker);
    }

    public getStudies() {
        this.queryFilter.updateUrlByFilterData();
        let filterReq = this.queryFilter.makeFilterRequest();
        this.scrollableResult.updateFilter(filterReq);
    }

    editStudy(study:Study) {
        var studyCopy:Study = Object.assign({}, study);
        this.onStudyEdit.emit(studyCopy);
        var time = document.body.scrollTop * 0.7 / (document.body.scrollTop * 0.001);
        this.scrollTo(document.body, 0, time);
    }

    viewVideo(study:Study) {
        var studyCopy:Study = Object.assign({}, study);
        this.component.showModal(studyCopy);
    }

    onShownVideo(study:Study) {
        if (study) {
            this.queryFilter.filter.view.value = study.id.toString();
            this.queryFilter.updateUrlByFilterData();
        }
    }

    onHideVideo(study:Study) {
        if (study) {
            this.queryFilter.filter.view.value = null;
            this.queryFilter.updateUrlByFilterData();
        }
    }

    deleteStudy(study:Study) {
        var studyCopy:Study = Object.assign({}, study);
        if (this.editmode) {
            this.onStudyDelete.emit(studyCopy);
        }
    }

    scrollTo(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(() => {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            this.scrollTo(element, to, duration - 10);
        }, 10);
    }

    public onPatternSearch(pattern:string) {
        this.queryFilter.filter.pattern.value = pattern;
        this.onSearch();
    }

    public onSearch(speaker?:string) {
        if (speaker) {
            this.queryFilter.filter.speaker.value = speaker;
            this.queryFilter.filter.pattern.value = null;
            this.onSearchPattern.emit('');
        }
        if (this.queryFilter.isFilterChanged(true)) {
            this.getStudies();
        }
    }

    onSearchClear(fieldName:string) {
        this.queryFilter.filter[fieldName].value = null;
        if (fieldName === 'pattern') {
            this.onSearchPattern.emit('');
        }
        this.onSearch();
    }

    loadWidget() {
        // TODO !!!
        //SB account ra-5771ed6bfe470e48
        //test account ra-5768d6ade5563361
        LoadScript.load('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5771ed6bfe470e48', {async: false});
        // if (typeof(YT) === 'undefined' || typeof(YT.Player) === 'undefined') {
        //     LoadScript.load('https://www.youtube.com/iframe_api', {async: false});
        // }
    }

    nextPage() {
        this.scrollableResult.next();
    }

}

import {Component, OnInit, OnChanges, Input, ViewChild, Output, EventEmitter} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {Router} from "@angular/router";
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS, DROPDOWN_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {Study} from "../../shared/model/study";
import {StudyService} from "../../shared/service/study.service";
import {StudyComponent} from "./study/studyComponent";
import {YTEmbedComponent} from "../youtube-embed-component/youtubeEmbedComponent";
import {ModalVideoComponent} from "../modal-component/modalVideoComponent";
import {InfiniteScroll} from "../infinite-scroll/infiniteScroll";
import {IScrollableResult, ScrollableResult} from "../infinite-scroll/scrollableResult";
import {QueryFilter} from "../infinite-scroll/queryFilter";
import {LoadScript} from "../load-script/loadScript";
import {SlideViewComponent} from "../slide-view-component/slideViewComponent";

@Component({
    moduleId: module.id,
    selector: 'ti-study-list',
    templateUrl: 'studyListComponent.html',
    styleUrls: ['studyListComponent.css'],
    providers: [StudyService],
    viewProviders: [BS_VIEW_PROVIDERS],
    directives: [
        <any>SlideViewComponent,
        <any>InfiniteScroll,
        <any>StudyComponent,
        <any>YTEmbedComponent,
        <any>ModalVideoComponent,
        MODAL_DIRECTVES,
        CORE_DIRECTIVES,
        DROPDOWN_DIRECTIVES
    ]
})

export class StudyListComponent implements OnInit, OnChanges {

    public list:Study[];

    @Input() editMode:boolean;

    @Output() onStudyEdit = new EventEmitter<Study>();
    @Output() onStudyDelete = new EventEmitter<Study>();
    @Output() onSearchPattern = new EventEmitter<string>();

    @ViewChild(<any>ModalVideoComponent) private component:ModalVideoComponent;

    queryFilter:QueryFilter;
    scrollableResult:IScrollableResult<Study>;

    sortOptions = [
        {value: 'MostRelevant', name: 'Most Relevant'},
        {value: 'MostRecent', name: 'Most Recent'},
        {value: 'MostPopular', name: 'Most Popular'},
    ];

    selectedSorting = this.sortOptions[0];

    public disabled:boolean = false;
    public status:{isopen:boolean} = {isopen: false};

    constructor(private studyService:StudyService, private router:Router) {
    }

    ngOnInit() {
        this.loadWidget();
        this.initList();
    }

    ngOnChanges(changes) {
        console.log('study component changes');
    }

    initList() {
        let filterConfig = {
            pattern: {value: null},
            speaker: {value: null},
            view: {value: null},
            sort: {value: this.selectedSorting.value}
        };
        this.queryFilter = new QueryFilter(filterConfig, this.router);
        let filterReq = this.queryFilter.makeFilterRequest();
        if (filterReq.pattern) {
            this.onSearchPattern.emit(filterReq.pattern);
        }
        this.scrollableResult = new ScrollableResult<Study>((data)=> this.studyService.find(data), 10, filterReq, true, false);
    }

    initQueryFilter() {
        if (this.queryFilter.filter.view.value != null) {
            setTimeout(() => {
                this.studyService.read(this.queryFilter.filter.view.value).subscribe(study => {
                    this.viewVideo(study);
                });
            }, 1000);
        }
    }

    public onSelectSpeaker(speaker:string) {
        this.onSearch(speaker);
    }

    public onSelectTitle(title:string) {
        this.onPatternSearch(title);
    }

    public getStudies() {
        this.queryFilter.updateUrlByFilterData();
        let filterReq = this.queryFilter.makeFilterRequest();
        this.scrollableResult.updateFilter(filterReq, null, null);
    }

    editStudy(study:Study) {
        var studyCopy:Study = Object.assign({}, study);
        this.onStudyEdit.emit(studyCopy);
        var time = document.body.scrollTop * 0.7 / (document.body.scrollTop * 0.001);
        this.scrollTo(document.body, 0, time);
    }

    viewVideo(study:Study) {
        var studyCopy:Study = Object.assign({}, study);
        if (!this.editMode) {
            this.studyService.updateviews(studyCopy.id.toString()).subscribe(res => {
                console.log(res);
            });
        }
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
        if (this.editMode) {
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
        let counter:number = 0;

        // Load External Scripts
        LoadScript.load('//s7.addthis.com/js/300/addthis_widget.js#pubid=' + AppConfig.addThisKey, {async: true}, () => {
            counter++;
            if(counter == 2) {
                this.initQueryFilter();
            }
        });
        if (typeof(YT) === 'undefined' || typeof(YT.Player) === 'undefined') {
            LoadScript.load('//www.youtube.com/iframe_api', {async: true}, () => {
                counter++;
                if(counter == 2) {
                    this.initQueryFilter();
                }
            });
        }
    }

    nextPage() {
        this.scrollableResult.next();
    }

    onChangeSorting(obj:any) {
        this.selectedSorting = obj;
        this.queryFilter.filter.sort.value = this.selectedSorting.value;
        this.onSearch();
    }

}

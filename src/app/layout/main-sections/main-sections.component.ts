import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-main-sections',
    templateUrl: './main-sections.component.html',
    styleUrls: ['./main-sections.component.scss']
})
export class MainSectionsComponent implements OnInit {

    @Input() mainSections;
    @Output() changeSectionEmit = new EventEmitter();
    @Output() toggleSidebarEmit = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    changeSection(link) {
        this.changeSectionEmit.emit(link);
    }

    closeSidebar() {
        this.toggleSidebarEmit.emit();
    }
}

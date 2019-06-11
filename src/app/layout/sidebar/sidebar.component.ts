import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DASHBOARD_LINKS, MAIN_SECTIONS, MENU_ITEM_ICONS} from '../../shared/constants/settings';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {AuthService} from '../../shared/services/auth.service';
import {PartnerService} from '../../shared/services/partner.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MainService} from '../../home/services/main.service';
import {SubjectService} from '../../shared/services/subject.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface TreeNode {
    name: string;
    children?: TreeNode[];
}

let treeData: TreeNode[] = [];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
    adminRole;
    dashboardLinks = DASHBOARD_LINKS;
    mainSections = MAIN_SECTIONS;
    sidebarOpened = false;
    mapForm: FormGroup;
    latlng: any = [];
    lat = 0;
    lng = 0;


    @Output() toggle = new EventEmitter();
    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);

    transformer = (node: TreeNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
        };
    };

    treeFlattener = new MatTreeFlattener(
        this.transformer, node => node.level, node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    sidebarOpen = false;

    @Output() toggleSide = new EventEmitter();

    constructor(
        private _partner: PartnerService,
        public _auth: AuthService,
        private cdr: ChangeDetectorRef,
        private _fb: FormBuilder,
        public router: Router,
        private main: MainService,
        private subject: SubjectService,
    ) {
    }

    ngOnInit() {
        this.getSidebarDataSrc();
        // this.toggle.emit();
        this.mapForm = this._fb.group({
            type: ['']
        });
    }

    getSidebarDataSrc() {
        this.adminRole = this._auth.checkRoles('admin');


        if (!this.adminRole && this._auth.userData) {
            const currentPartnerType = this._auth.userData.partner_type ? this._auth.userData.partner_type.name : '';
            const employeeRole = this._auth.checkRoles('employee');

            // Generating partner links based on current partner type
            this.dashboardLinks = this.dashboardLinks.filter(l => {

                if (employeeRole && l.children) {
                    l.children = l.children.filter(sl => !sl.name.includes('Add'));
                }

                // Showing dashboard and current partner type links
                const linksShown = l.name === 'Dashboard' || l.name === currentPartnerType || l.name === 'Jobs';

                return employeeRole ? linksShown : linksShown || l.name === 'Employees';


            });
        }

        this.dataSource.data = this.dashboardLinks;
    }

    /**
     * Gets icons for each node
     * @param node current section name
     */
    getIcon(node) {
        let icon = '';
        const parentNode = this.getParent(node);
        const childNode = node.name.toLowerCase();

        MENU_ITEM_ICONS.map(mi => {
            if (childNode.includes('add')) {
                icon = 'fa-plus';
            } else if (childNode.includes('edit')) {
                icon = 'fa-edit';
            } else if (parentNode === mi['item']) {
                icon = mi['icon'];
            } else if (parentNode.includes(mi['item'])) {
                icon = mi['icon'];
            }
        });
        return icon;
    }

    /**
     * Navigates to the selected node page
     * @param node current section name
     */
    navigate(node) {
        const parentNode = this.getParent(node);
        const childNode = node.name.toLowerCase().replace(/ /g, '-');
        const url = parentNode.replace(/\//g, '-') + '/' + (childNode === 'show' ? '' : childNode);
        const role = this._auth.checkRoles('admin') ? 'admin/' : (this._auth.checkRoles('partner') ? 'partners/' : 'employees/');
        // sidenav.toggle();
        this.sidebarOpened = !this.sidebarOpened;
        if (this.responsiveMode) {
            this.toggle.emit();
            this.closeSidebar();
        }
        this.router.navigate([role + url]);
        this.expandLinks();
    }

    /**
     * Gets the parent node of current one
     * @param node current section node
     */
    getParent(node) {
        const {treeControl} = this;
        const currentLevel = treeControl.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = treeControl.dataNodes[i];

            if (treeControl.getLevel(currentNode) < currentLevel) {
                return currentNode.name.toLowerCase();
            }
        }
    }

    toggleSidebar() {
        this.toggleSide.emit();
        if (this.router.url === '/' || this.router.url.includes('auth')) {
            this.sidebarOpen = !this.sidebarOpen;

        }
    }

    closeSidebar() {
        this.sidebarOpen = false;
    }

    changePlace(section) {
        this.main.changePlace(this.mapForm.value).subscribe((r: any) => {

            this.latlng = [];

            if (r && r.length > 0) {

                r.map((latlngs) => {
                    latlngs.lat = parseFloat(latlngs.lat);
                    latlngs.lng = parseFloat(latlngs.lng);
                    this.latlng.push(latlngs);
                });

                this.lat = parseFloat(this.latlng[0].lat);
                this.lng = parseFloat(this.latlng[0].lng);


            }

            this.subject.setMapData({
                section: section,
                lat: this.lat,
                lng: this.lng,
                latlng: this.latlng
            });
            this.toggle.emit();

        });
    }


    changeSection(section) {
        this.mapForm.patchValue({type: section});
        this.changePlace(section);
        if (this.responsiveMode) {
            this.closeSidebar();
        }

    }

    // Expanding necessary tree parent node
    ngAfterViewInit() {
        this.expandLinks();
    }

    expandLinks() {
        const routerUrl = this.router.url.replace('_', ' ');
        for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
            const node = this.treeControl.dataNodes[i];
            const treeItem = node.name.toLowerCase().replace(/\//g, '-');
            if (routerUrl.includes(treeItem)) {
                this.treeControl.expand(node);
                this.cdr.detectChanges();
            }
        }
    }

    get responsiveMode() {

        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}

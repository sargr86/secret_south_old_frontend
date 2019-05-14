import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {Router} from '@angular/router';
import {PartnerService} from '../../services/partner.service';
import {AuthService} from '../../services/auth.service';
import {DASHBOARD_LINKS, MENU_ITEM_ICONS} from '../../constants/settings';


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
    selector: 'app-main-dashboard',
    templateUrl: './main-dashboard.component.html',
    styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit, AfterViewInit {

    adminRole;
    dashboardLinks = DASHBOARD_LINKS;

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


    constructor(
        public router: Router,
        private _partner: PartnerService,
        public _auth: AuthService,
        private cdr: ChangeDetectorRef
    ) {

        this.adminRole = this._auth.checkRoles('admin');


        if (!this.adminRole) {
            const currentPartnerType = this._auth.userData.partner_type ? this._auth.userData.partner_type.name : '';
            const employeeRole = this._auth.checkRoles('employee');

            // Generating partner links based on current partner type
            this.dashboardLinks = this.dashboardLinks.filter(l => {

                if (employeeRole && l.children) {
                    l.children = l.children.filter(sl => !sl.name.includes('Add'));
                }

                // Showing dashboard and current partner type links
                const linksShown = l.name === 'Dashboard' || l.name === currentPartnerType;

                return employeeRole ? linksShown : linksShown || l.name === 'Employees';


            });
        }

        this.dataSource.data = this.dashboardLinks;
    }

    ngOnInit() {

    }

    // Expanding necessary tree parent node
    ngAfterViewInit() {
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

    /**
     * Logs out current user
     */
    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['auth/login']);
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
        const role = this.adminRole ? 'admin/' : (this._auth.checkRoles('partner') ? 'partners/' : 'employees/')
console.log(role + url)
        this.router.navigate([role + url]);
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
}

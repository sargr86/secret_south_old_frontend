import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {Router} from '@angular/router';
import {PartnerService} from '../../services/partner.service';
import {AuthService} from '../../services/auth.service';
import {MENU_ITEM_ICONS} from '../../constants/settings';


/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
    name: string;
    children?: FoodNode[];
}

let treeData: FoodNode[] = [];

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
export class MainDashboardComponent implements OnInit {

    partnerLinks = ['profile'];

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);

    transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
        };
    }

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
        this._partner.getOnePartner({id: this._auth.userData.id}).subscribe(dt => {
            const partnerType = dt['partner_type']['name'];
            if (dt && !this.partnerLinks.includes(partnerType)) {
                this.partnerLinks.push(partnerType);

                const typeLink = {
                    name: partnerType,
                    children: [
                        {name: 'Add'},
                        {name: 'Show'},
                    ]
                };

                treeData = [{
                    name: 'Profile',
                    children: [
                        {name: 'Edit'},
                        {name: 'Show'},
                    ]
                }];


                treeData.push(typeLink);


            }
            this.dataSource.data = treeData;
            this.expand(this.treeControl);
        });
    }

    ngOnInit() {

    }

    expand(treeControl) {
        const routerUrl = this.router.url.replace('_', ' ');
        for (let i = 0; i < treeControl.dataNodes.length; i++) {
            const node = treeControl.dataNodes[i];
            const treeItem = node.name.toLowerCase();

            if (routerUrl.includes(treeItem)) {
                this.treeControl.expand(node);
                this.cdr.detectChanges();
            }
        }
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['auth/login']);
    }

    getIcon(item) {
        let icon = '';

        item = item.toLowerCase();
        MENU_ITEM_ICONS.map(mi => {

            if (item.includes('add')) {
                icon = 'fa-plus';
            } else if (item.includes('edit')) {
                icon = 'fa-edit';
            } else if (item.includes('show')){
                icon = 'fa-search';
            }
        });
        return icon;
    }

    navigate(node) {
        const parentNode = this.getParent(node);
        const url = parentNode.replace(/\//g, '-') + '/' + node.name.toLowerCase();
        this.router.navigate(['partners/' + url]);
    }

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

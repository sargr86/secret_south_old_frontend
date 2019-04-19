import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PartnerService} from '../../admin/services/partner.service';
import {AuthService} from '../../shared/services/auth.service';
import {MENU_ITEM_ICONS} from '../../shared/constants/settings';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {FlatTreeControl} from '@angular/cdk/tree';

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
    selector: 'app-partner-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


    transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
        };
    };

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
        this.transformer, node => node.level, node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


    partnerLinks = ['profile'];

    constructor(
        public router: Router,
        private _partner: PartnerService,
        public _auth: AuthService
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
        });
    }

    ngOnInit() {

    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['partners/login']);
    }

    getIcon(item) {
        let icon = '';

        item = item.toLowerCase();
        MENU_ITEM_ICONS.map(mi => {

            if (item.includes('add')) {
                icon = 'fa-plus';
            } else if (item.includes('edit')) {
                icon = 'fa-edit';
            } else {
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

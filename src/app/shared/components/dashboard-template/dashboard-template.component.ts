import {Router} from '@angular/router';

import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit, Injectable, ViewChild, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MENU_ITEM_ICONS} from '../../constants/settings';
import {AuthService} from '../../services/auth.service';

export class DynamicFlatNode {
    constructor(public item: string, public level = 1, public expandable = false,
                public isLoading = false) {
    }
}

export class DynamicDatabase {
    dataMap = new Map<string, string[]>([
        ['Admin', ['Dashboard']],
        ['Ferries', ['Add Ferries', 'All Ferries']],
        ['Tours', ['Add Tours', 'All Tours', 'Add Tours Types', 'All Tours Types']],
        ['Food-Drink', ['Add Food-Drink', 'All Food-Drink']],
        ['Partners', ['Add Partners', 'All Partners']],
        ['Gps Location', ['Add Locations']],
    ]);

    rootLevelNodes: string[] = ['Admin', 'Ferries', 'Tours', 'Food-Drink', 'Partners', 'Gps Location'];

    /** Initial data from database */
    initialData(): DynamicFlatNode[] {
        return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
    }

    getChildren(node: string): string[] | undefined {
        return this.dataMap.get(node);
    }

    isExpandable(node: string): boolean {
        return this.dataMap.has(node);
    }
}

@Injectable()
export class DynamicDataSource {

    dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

    get data(): DynamicFlatNode[] {
        return this.dataChange.value;
    }

    set data(value: DynamicFlatNode[]) {
        this.treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    constructor(private treeControl: FlatTreeControl<DynamicFlatNode>,
                private database: DynamicDatabase) {
    }

    connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
        this.treeControl.expansionModel.onChange.subscribe(change => {
            if ((change as SelectionChange<DynamicFlatNode>).added ||
                (change as SelectionChange<DynamicFlatNode>).removed) {
                this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
            }
        });

        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }

    /** Handle expand/collapse behaviors */
    handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
        }
    }

    /**
     * Toggle the node, remove from display list
     */
    toggleNode(node: DynamicFlatNode, expand: boolean) {
        const children = this.database.getChildren(node.item);
        const index = this.data.indexOf(node);
        if (!children || index < 0) { // If no children, or cannot find the node, no op
            return;
        }

        // node.isLoading = true;

        // setTimeout(() => {
        if (expand) {
            const nodes = children.map(name =>
                new DynamicFlatNode(name, node.level + 1, this.database.isExpandable(name)));
            this.data.splice(index + 1, 0, ...nodes);
        } else {
            let count = 0;
            for (let i = index + 1; i < this.data.length
            && this.data[i].level > node.level; i++, count++) {
            }
            this.data.splice(index + 1, count);
        }

        // notify the change
        this.dataChange.next(this.data);
        // node.isLoading = false;
        // }, 1000);
    }
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard-template.component.html',
    styleUrls: ['./dashboard-template.component.scss'],
    providers: [DynamicDatabase]
})

export class DashboardTemplateComponent implements OnInit, AfterViewInit {

    @ViewChild('drawer') drawer;
    userType = 'User';

    constructor(
        public router: Router,
        database: DynamicDatabase,
        private cdr: ChangeDetectorRef,
        public _auth: AuthService
    ) {
        this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new DynamicDataSource(this.treeControl, database);

        this.dataSource.data = database.initialData();

        if (this._auth.checkRoles('admin')) {
            this.userType = 'Admin';
        }


    }

    activeItem;
    showFiller = false;
    menuItemIcons = MENU_ITEM_ICONS;

    treeControl: FlatTreeControl<DynamicFlatNode>;

    dataSource: DynamicDataSource;

    getLevel = (node: DynamicFlatNode) => node.level;

    isExpandable = (node: DynamicFlatNode) => node.expandable;

    hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;


    ngOnInit() {

        if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
            this.drawer.toggle();
            this.showFiller = true;
        }


    }

    ngAfterViewInit() {

        const routerUrl = this.router.url.replace('_', ' ');
        for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
            const node = this.treeControl.dataNodes[i];
            const treeItem = node.item.toLowerCase();

            if (routerUrl.includes(treeItem)) {
                // console.log(treeItem, routerUrl)
                this.treeControl.expand(node);
                this.cdr.detectChanges();
            }
        }
    }

    changeWidth(drawer) {

        if (!drawer) {
            this.showFiller = true;
        } else {
            this.showFiller = false;
        }
    }

    checkAdmin() {
        let jsAdminInf = localStorage.getItem('adminInf');
        if (typeof jsAdminInf == 'undefined') {
            return false;
        }

        let adminInf = JSON.parse(jsAdminInf);

        if (adminInf == null) {
            return false;
        }

        if (adminInf['admin_session_inf'] == '') {
            return false;
        }

        return true;
    }

    routing(name) {
        const route = name.replace(/ /g, '_').toLowerCase();

        this.router.navigate(['/admin/' + route]);
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['admin/login']);
    }

    getIcon(item) {
        let icon = '';
        // console.log(item)
        item = item.toLowerCase();
        MENU_ITEM_ICONS.map(mi => {

            if (item.includes('add')) {
                icon = 'fa-plus';
            } else if (item.includes(mi['item'])) {
                icon = mi['icon'];
            } else if (item.includes('type')) {
                icon = 'fa-street-view';
            }
        });
        return icon;
    }

    checkActiveItem(item) {
        const routerItem = this.router.url.replace('admin', '').replace(/[_\/]/g, '').trim();
        const itemStr = item.toLowerCase().replace(/ /g, '');

        if (routerItem === itemStr) {
            this.activeItem = item;
        }
        return item;
    }

}

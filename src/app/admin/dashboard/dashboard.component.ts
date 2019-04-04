import {Router} from "@angular/router";

import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit, Injectable} from '@angular/core';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export class DynamicFlatNode {
  constructor(public item: string, public level = 1, public expandable = false,
              public isLoading = false) {
  }
}

export class DynamicDatabase {
  dataMap = new Map<string, string[]>([
    ['Ferry', ['Add Ferry', 'All Ferry']],
    ['Tours', ['Add Tours', 'All Tours', 'Add Tours Type', 'All Tours Type']],
    ['Food-Drink', ['Add Food-Drink', 'All Food-Drink']],
    ['Partner', ['Add Partner', 'All Partner']],
    ['Gps Location', ['Add location']],
  ]);

  rootLevelNodes: string[] = ['Ferry', 'Tours', 'Food-Drink', 'Partner', 'Gps Location'];

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
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DynamicDatabase]
})

export class DashboardComponent implements OnInit {

  constructor(private router: Router, database: DynamicDatabase) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    this.dataSource.data = database.initialData();
  }

  showFiller = false;

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  ngOnInit() {

    if (!this.checkAdmin()) {
      this.router.navigate(['admin-panel']);
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

  routing(router_name) {

    let router = router_name.split(' ');

    this.router.navigate(['/admin/' + router.join('')]);
  }

  logout() {
    localStorage.removeItem('adminInf');
    this.router.navigate(['admin-panel']);
  }

}

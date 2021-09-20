import { Component, Input, OnChanges } from '@angular/core';
import { NodeModel } from '@/app/node.model';
import { FolderService } from '../folder-service/folder.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeComponent {

  @Input() set node (n: NodeModel) {
    // node changed
    this._node = n;
    this.nodeIcon = this._getNodeIcon(this.node.type);
  }
  get node () {
    return this._node;
  }
  private _node: NodeModel;

  nodeIcon: string;

  trackNode = (_, node) => node.id;

  constructor(private folderService: FolderService) {}

  deleteNode() {
    this.folderService.deleteNode(this.node);
  }

  commitNode() {
    const parent = this.folderService.getNodeParent(this.node);
    if (parent && parent.type === 'root') {
      this.node.uncommitted = false;
    }
  }

  cancelAddition() {
    this.folderService.deleteNode(this.node);
  }

  addFolder() {
    this.folderService.addNode(this.node, {
      type: 'unset',
      uncommitted: true,
    });
  }

  private _getNodeIcon(type: NodeModel['type']) {
    switch (type) {
      case 'file':
        return '../../assets/images/file-regular.svg';
      case 'folder':
        return '../../assets/images/folder-open-regular.svg';
      default:
        return '';
    }
  }

}

import { Component, Input, OnChanges } from '@angular/core';
import { NodeModel } from '@/app/node.model';
import { FolderService } from '../folder-service/folder.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent {

  @Input() node: NodeModel;

  constructor(private folderService: FolderService) {}

  deleteNode() {
    this.folderService.deleteNode(this.node);
  }

  commitNode() {
    if (!this.node.name) {
      this.folderService.deleteNode(this.node);
    } else {
      this.node.uncommitted = false;
    }
  }

  cancelAddition() {
    this.folderService.deleteNode(this.node);
  }

  addNode() {
    this.folderService.addNode(this.node, {
      type: 'unset',
      uncommitted: true,
    });
  }

}

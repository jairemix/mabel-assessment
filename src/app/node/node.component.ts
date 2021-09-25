import { Component, Input, OnChanges } from '@angular/core';
import { NodeModel } from '@/app/node.model';
import { FolderService } from '../folder-service/folder.service';

/**
 * component that renders a node and all its children
 * 
 * if node type is 'root', only its children are rendered (since the root node itself is not visible)
 */
@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent {

  @Input() node: NodeModel;

  constructor(private folderService: FolderService) {}

  /**
   * delete node from folder structure
   */
  deleteNode() {
    this.folderService.deleteNode(this.node);
  }

  /**
   * removes 'uncommitted' state from node - this is to indicate that the a newly added node is no longer being edited in the UI
   */
  commitNode() {
    if (!this.node.name) {
      this.folderService.deleteNode(this.node);
    } else {
      this.node.uncommitted = false;
    }
  }

  /**
   * appends a new uncommitted node of 'unset' type to this node
   */
  appendNode() {
    this.folderService.appendNode(this.node, {
      type: 'unset',
      uncommitted: true,
    });
  }

}

import { Injectable } from '@angular/core';
import { NodeModel } from '@/app/node.model';
import { getTestRootNode } from './get-test-root-node';
import { getUniqueID } from '@/app/util/get-unique-id';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  // rootNode: NodeModel = getTestRootNode();

  rootNode: NodeModel = {
    id: getUniqueID(),
    type: 'root',
    children: [],
  };

  constructor() {
    console.log('folderService', this);
  }

  addNode(parent: NodeModel, node: Omit<NodeModel, 'id'>) {

    const newNode = {
      id: getUniqueID(),
      ...node,
    };

    // will have to make parent (and whole tree) immutable to use changeDetection.OnPush
    parent.children = [
      ...(parent.children || []),
      newNode,
    ];

  }

  deleteNode(node: NodeModel) {
    const parent = this.getNodeParent(node);
    console.log('parent', parent);
    if (parent) {
      parent.children = (parent.children || []).filter(n => n.id !== node.id);
    } else {
      console.error('no parent found for node', node);
    }
  }

  getNodeParent(node: NodeModel): undefined | NodeModel {
    return this._getNodeParent(this.rootNode, node);
  }

  /**
   * recursive function to find the parent of childNode in the subtree where node is the root
   * 
   * @param node root of subtree which is being checked
   * @param childNode child node whose parent is to be found
   * @return the parent of childNode if it is found, undefined otherwise
   */
  private _getNodeParent(node: NodeModel, childNode: NodeModel): undefined | NodeModel {
    const nodeChildren = node.children || [];
    const isParent = nodeChildren.some((n) => n.id === childNode.id);

    if (isParent) { // base case: found
      return node;
    }

    // base case: nodeChildren.length === 0 or loop finishes iterating through all children (not found)
    for (let n of nodeChildren) {
      const parent = this._getNodeParent(n, childNode);
      if (parent) {
        return parent;
      }
    }
  }

}

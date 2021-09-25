import { Injectable } from '@angular/core';
import { NodeModel } from '@/app/node.model';
import { getUniqueID } from '@/app/util/get-unique-id';
import { getTestRootNode } from './get-test-root-node';

/**
 * Service that contains node tree model and that manages addition and deletion of nodes to that tree
 */
@Injectable({
  providedIn: 'root'
})
export class FolderService {

  /**
   * root node of the tree that represents the folder structure 
   */
  rootNode: NodeModel = {
    id: getUniqueID(),
    type: 'root',
    children: [],
  };

  constructor() {
    // sample data we can use if we need to generate a tree quickly for testing  
    // this.rootNode = getTestRootNode();
  }

  /**
   * Appends a new node to a parent node
   * @param parent parent node to append the new node to
   * @param nodeData node that is to be appended (without id property since this is generated automatically by this function)
   */
  appendNode(parent: NodeModel, nodeData: Omit<NodeModel, 'id'>) {

    // add unique generated id to nodeData
    const newNode = {
      id: getUniqueID(),
      ...nodeData,
    };

    // add newNode to parent.children
    parent.children = [
      ...(parent.children || []), // if children does not exist already, create it
      newNode,
    ];

  }

  /**
   * deletes node from the folder structure if it exists
   * @param node node to be deleted
   */
  deleteNode(node: NodeModel) {
    const parent = this.getNodeParent(node);
    if (parent) {
      parent.children = (parent.children || []).filter(n => n.id !== node.id); // remove node from children 
    } else {
      console.error('no parent found for node', node);
    }
  }

  /**
   * @param node whose parent is to be found
   * @returns parent of node if it exists within the tree, undefined otherwise
   */
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
    const isParent = nodeChildren.some((n) => n.id === childNode.id); // node is the parent if it contains the childNode

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

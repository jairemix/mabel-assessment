import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NodeModel } from '@/app/node.model';
import { getUniqueID } from '@/app/util/get-unique-id';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private _rootSubject = new BehaviorSubject<NodeModel>({
    id: getUniqueID(),
    type: 'root',
    children: [

      {
        id: getUniqueID(),
        name: 'physics',
        type: 'folder',
        children: [
          {
            id: getUniqueID(),
            name: 'relativity',
            type: 'folder',
            children: [
              {
                id: getUniqueID(),
                name: 'equivalence_principle.txt',
                type: 'file',
              },
            ],
          },

          {
            id: getUniqueID(),
            name: 'newtonian_mechanics.txt',
            type: 'file',
          },

        ],
      },

      {
        id: getUniqueID(),
        name: 'calculus',
        type: 'folder',
        children: [
          {
            id: getUniqueID(),
            name: 'multivariable_calculus.txt',
            type: 'file',
          },
          {
            id: getUniqueID(),
            name: 'integration_by_parts.txt',
            type: 'file',
          },
        ],
      },

      {
        id: getUniqueID(),
        name: 'astronomy.txt',
        type: 'file',
      },

    ],
  });

  /**
   * Maps each child node to its parent. Used so that we can easily traverse up the node tree back to the root (since we don't have backlinks on the NodeModel object)
   * Used WeakMap instead of an additional property `parent` on NodeModel so that NodeTree is not cyclical; hence it can still be cloned without error and persisted if needed
   * Used WeakMap instead of Map so that entries can get marked for garbage collection when deleting a child.
   */
  private _parentWeakMap = new WeakMap<NodeModel, NodeModel>()

  constructor() {
    // TODO: remove stuff
    this._assignParentLinks(this._rootSubject.value);
    console.warn('folderService', this);
  }

  /**
   * @returns Observable of folder structure
   */
  getRoot$() {
    return this._rootSubject.pipe(filter(x => !!x));
  }

  getRoot() {
    return this._rootSubject.value;
  }

   addNode(parent: NodeModel, node: Omit<NodeModel, 'id'>) {

    console.log('addNode', parent, node);

    const newNode = {
      id: getUniqueID(),
      ...node,
    };

    // will have to make parent (and whole tree) immutable to use changeDetection.OnPush
    parent.children = [
      ...(parent.children || []),
      newNode,
    ];

    this._parentWeakMap.set(newNode, parent);

    this._rootSubject.next(this._rootSubject.value); // notify Observers
  }

  deleteNode(node: NodeModel) {
    const parent = this.getNodeParent(node);
    if (parent) {
      parent.children = (parent.children || []).filter(n => n.id !== node.id);
      this._rootSubject.next(this._rootSubject.value); // notify Observers
    } else {
      console.error('no parent found for node', node);
    }
  }

  getNodeParent(node: NodeModel): void | NodeModel {
    return this._parentWeakMap.get(node);
  }

  // helps with debugging
  private _assignParentLinks(node: NodeModel) {
    for (let child of (node.children || [])) { // base case no more children
      this._parentWeakMap.set(child, node);
      this._assignParentLinks(child);
    }
  }
}

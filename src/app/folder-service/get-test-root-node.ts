import { getUniqueID } from '@/app/util/get-unique-id';
import { NodeModel } from '../node.model';

/**
 * @returns root node of sample tree just for testing
 */
export function getTestRootNode(): NodeModel {
  return {
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
  }
}

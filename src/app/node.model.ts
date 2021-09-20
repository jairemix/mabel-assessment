export class NodeModel {
    type: 'root' | 'folder' | 'file' | 'unset' | null;
    name?: string;
    children?: NodeModel[];
    id: string;
    uncommitted?: boolean;
}

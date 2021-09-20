import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NodeModel } from '@/app/node.model';
import { FolderService } from '../folder-service/folder.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeComponent implements OnChanges {

  @Input() node: NodeModel;

  nodeIcon: string;

  trackNode = (_, node) => node.id;

  constructor(private folderService: FolderService) {}

  ngOnChanges(c: SimpleChanges) {
    if (c.node) {
      this.nodeIcon = this._getNodeIcon(this.node.type);
    }
  }

  deleteNode() {
    this.folderService.deleteNode(this.node);
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

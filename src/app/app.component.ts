import { Component } from '@angular/core';
import { FolderService } from '@/app/folder-service/folder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mable-assessment';

  constructor(readonly folderService: FolderService) {}

  /**
   * appends a new folder to the root node. new node is uncommited - so the user needs to commit it with the tick button.
   */
  appendFolderToRoot() {
    this.folderService.appendNode(this.folderService.rootNode, {
      type: 'folder',
      uncommitted: true,
      children: [],
    });
  }

  /**
   * @returns pretty printed JSON representation of the current node tree 
   */
  getJSON() {
    return JSON.stringify(this.folderService.rootNode, null, 2);
  }

}

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

  addFolderToRoot() {
    this.folderService.addNode(this.folderService.rootNode, {
      type: 'folder',
      uncommitted: true,
      children: [],
    });
  }

  getJSON() {
    return JSON.stringify(this.folderService.rootNode, null, 2);
  }

}

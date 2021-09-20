import { Component } from '@angular/core';
import { FolderService } from '@/app/folder-service/folder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mabel-assessment';

  rootNode$ = this.folderService.getRoot$();

  trackNode = (_, node) => node.id;

  constructor(private folderService: FolderService) {}

  addFolderToRoot() {

    this.folderService.addNode(this.folderService.getRoot(), {
      name: 'my_first_folder',
      type: 'folder',
      uncommitted: true,
      children: [],
    });

    // this.folderService.addNode(this.folderService.getRoot(), {
    //   name: 'my_first_folder',
    //   type: 'folder',
    //   children: [],
    // });
  }

}

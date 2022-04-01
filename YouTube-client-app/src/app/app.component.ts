import {
  Component,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title: string;
  public SortingBarView: boolean;

  constructor() {
    this.title = 'YouTube-client-app';
    this.SortingBarView = false;
  }

  toggleSortingBar(SortingBarView: boolean) {
    this.SortingBarView = SortingBarView;
  }
}

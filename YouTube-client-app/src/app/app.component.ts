import {
  Input,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Input() public SortingBarView: boolean;

  title = 'YouTube-client-app';

  toggle(SortingBarView: boolean) {
    const message = `event ${SortingBarView}`;
    console.log(message);
  }
}

import {
  EventEmitter,
  Output,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() headerToggleEvent = new EventEmitter < boolean >();

  public SortingBarView: boolean;

  constructor() {
    this.SortingBarView = false;
  }

  public toggleSortingBar(): void {
    this.SortingBarView = !this.SortingBarView;
    this.headerToggleEvent.emit(this.SortingBarView);
  }

  ngOnInit(): void {}
}

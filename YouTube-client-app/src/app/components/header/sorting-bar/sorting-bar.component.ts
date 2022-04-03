import {
  EventEmitter,
  Output,
  Input,
  Component,
} from '@angular/core';

@Component({
  selector: 'app-sorting-bar',
  templateUrl: './sorting-bar.component.html',
  styleUrls: ['./sorting-bar.component.scss'],
})
export class SortingBarComponent {
  @Input() public SortingBarView: boolean;
  @Output() outSortingByViewsEvent = new EventEmitter < string >();

  public viewsSortingOrder: string;

  constructor() {
    this.viewsSortingOrder = 'increasing';
  }

  public makeSortingByViewsCount(): void {
    (this.viewsSortingOrder === 'increasing') ? this.viewsSortingOrder = 'decreasing' : this.viewsSortingOrder = 'increasing';
    this.outSortingByViewsEvent.emit(this.viewsSortingOrder);
    this.decorateText('sorting by views count');
  }

  private decorateText(text: string): void {
    const sortingButtons: NodeListOf < HTMLElement > | null = document.querySelectorAll('.header__sorting-button');
    if (sortingButtons.length) {
      switch (text) {
        case 'sorting by views count':
          sortingButtons[0].style.textDecoration = 'none';
          sortingButtons[1].style.textDecoration = 'underline';
          sortingButtons[2].style.textDecoration = 'none';
          break;
        default:
          sortingButtons[0].style.textDecoration = 'none';
          sortingButtons[1].style.textDecoration = 'none';
          sortingButtons[2].style.textDecoration = 'none';
      }
    }
  }
}

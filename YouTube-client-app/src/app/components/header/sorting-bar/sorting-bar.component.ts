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
  @Output() outSortingByPublishedAtEvent = new EventEmitter < string >();

  public viewsSortingOrder: string;
  public publishedAtSortingOrder: string;

  constructor() {
    this.viewsSortingOrder = 'increasing';
    this.publishedAtSortingOrder = 'increasing';
  }

  public makeSortingByViewsCount(): void {
    (this.viewsSortingOrder === 'increasing') ? this.viewsSortingOrder = 'decreasing' : this.viewsSortingOrder = 'increasing';
    this.outSortingByViewsEvent.emit(this.viewsSortingOrder);
    this.decorateText('sorting by views count');
  }

  public makeSortingByPublishedAt(): void {
    (this.publishedAtSortingOrder === 'increasing') ? this.publishedAtSortingOrder = 'decreasing' : this.publishedAtSortingOrder = 'increasing';
    this.outSortingByPublishedAtEvent.emit(this.publishedAtSortingOrder);
    this.decorateText('sorting by published at');
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
        case 'sorting by published at':
          sortingButtons[0].style.textDecoration = 'underline';
          sortingButtons[1].style.textDecoration = 'none';
          sortingButtons[2].style.textDecoration = 'none';
          break;
        default:
          sortingButtons.forEach(elem => elem.style.textDecoration = 'none');/* eslint-disable-line */
      }
    }
  }
}

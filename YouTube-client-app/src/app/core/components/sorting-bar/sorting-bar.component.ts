import {
  Component,
} from '@angular/core';

import { HeaderBarService } from '../../services/header-bar.service';

import { HeaderBarModel } from '../../models/header-bar.model';

@Component({
  selector: 'app-sorting-bar',
  templateUrl: './sorting-bar.component.html',
  styleUrls: ['./sorting-bar.component.scss'],
})
export class SortingBarComponent {
  private readonly headerBarService: HeaderBarService;
  public viewsSortingOrder: string;
  public publishedAtSortingOrder: string;
  public filterSentence: string;
  public headerBarConditions: HeaderBarModel;

  constructor(headerBarService: HeaderBarService) {
    this.headerBarService = headerBarService;
    this.viewsSortingOrder = 'increasing';
    this.publishedAtSortingOrder = 'increasing';
    this.filterSentence = '';
    this.headerBarConditions = headerBarService.headerBarConditions;
  }

  public makeSentenceFilter(): void {
    this.headerBarService.changeFilterSentence(this.filterSentence);
  }

  public makeSortingByViewsCount(): void {
    (this.viewsSortingOrder === 'increasing') ? this.viewsSortingOrder = 'decreasing' : this.viewsSortingOrder = 'increasing';/* eslint-disable-line */
    this.decorateText('sorting by views count');
    this.headerBarService.changeViewsSortingOrder(this.viewsSortingOrder);
  }

  public makeSortingByPublishedAt(): void {
    (this.publishedAtSortingOrder === 'increasing') ? this.publishedAtSortingOrder = 'decreasing' : this.publishedAtSortingOrder = 'increasing';/* eslint-disable-line */
    this.decorateText('sorting by published at');
    this.headerBarService.changePublishedAtSortingOrder(this.publishedAtSortingOrder);
  }

  private decorateText(text: string): void {
    const sortingButtons: NodeListOf < HTMLElement > | null = document.querySelectorAll('.header__sorting-button');
    if (sortingButtons.length) {
      switch (text) {
        case 'sorting by views count':
          sortingButtons[0].style.textDecoration = 'none';
          sortingButtons[1].style.textDecoration = 'underline';
          break;
        case 'sorting by published at':
          sortingButtons[0].style.textDecoration = 'underline';
          sortingButtons[1].style.textDecoration = 'none';
          break;
        default:
          sortingButtons.forEach(elem => elem.style.textDecoration = 'none');/* eslint-disable-line */
      }
    }
  }
}

import {
  Component, OnInit, OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { SortingService } from '../../../services/sorting.service';
import { HeaderBarService } from '../../../../core/services/header-bar.service';
import { SearchItem } from '../../../models/search-item.model';
import { HeaderBarModel } from '../../../../core/models/header-bar.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  private readonly sortingService: SortingService;
  private readonly headerBarService: HeaderBarService;
  public headerBarConditions: HeaderBarModel;
  private dataForSearchSubs: Subscription;
  private viewsSortingOrderSubs: Subscription;
  private publishedAtSortingOrderSubs: Subscription;
  private filterSentenceSubs: Subscription;
  public items: SearchItem[];

  constructor(headerBarService: HeaderBarService, sortingService: SortingService) {
    this.sortingService = sortingService;
    this.headerBarService = headerBarService;
    this.headerBarConditions = headerBarService.headerBarConditions;
  }

  ngOnInit(): void {
    this.dataForSearchSubs = this.headerBarService.dataForSearch$.subscribe(async (dataForSearch): Promise < void > => {
      console.log(dataForSearch);
      await this.sortingService.handleSearch();
      this.items = this.sortingService.items;
    });

    this.viewsSortingOrderSubs = this.headerBarService.viewsSortingOrder$.subscribe((viewsSortingOrder): void => {
      this.sortingService.viewsSortingOrder = viewsSortingOrder;
      this.sortingService.handleViewsSortingOrderChange();
    });

    this.publishedAtSortingOrderSubs = this.headerBarService.publishedAtSortingOrder$.subscribe(
      (publishedAtSortingOrder): void => {
        this.sortingService.publishedAtSortingOrder = publishedAtSortingOrder;
        this.sortingService.handlePublishedAtSortingOrderChange();
      },
    );

    this.filterSentenceSubs = this.headerBarService.filterSentence$.subscribe((filterSentence): void => {
      this.sortingService.filterSentence = filterSentence;
      this.sortingService.filterBySentence();
      this.items = this.sortingService.items;
    });
  }

  ngOnDestroy(): void {
    this.dataForSearchSubs.unsubscribe();
    this.viewsSortingOrderSubs.unsubscribe();
    this.publishedAtSortingOrderSubs.unsubscribe();
    this.filterSentenceSubs.unsubscribe();
  }
}

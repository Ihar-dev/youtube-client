import {
  Component, OnInit, OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { SortingService } from '../../../services/sorting.service';
import { SearchingService } from '../../../services/searching.service';
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
  private readonly searchingService: SearchingService;
  private readonly headerBarService: HeaderBarService;
  public headerBarConditions: HeaderBarModel;
  private dataForSearchSubs: Subscription;
  private viewsSortingOrderSubs: Subscription;
  private publishedAtSortingOrderSubs: Subscription;
  private filterSentenceSubs: Subscription;
  public items: SearchItem[];

  constructor(headerBarService: HeaderBarService, sortingService: SortingService, searchingService: SearchingService) {
    this.sortingService = sortingService;
    this.searchingService = searchingService;
    this.headerBarService = headerBarService;
    this.headerBarConditions = headerBarService.headerBarConditions;
  }

  ngOnInit(): void {
    this.items = this.sortingService.items;
    this.dataForSearchSubs = this.headerBarService.dataForSearch$.subscribe(async (dataForSearch): Promise < void > => {
      console.log(dataForSearch);
      await this.searchingService.handleSearch(dataForSearch);
      this.items = this.sortingService.items;
    });

    this.viewsSortingOrderSubs = this.headerBarService.viewsSortingOrder$.subscribe((viewsSortingOrder): void => {
      this.sortingService.handleViewsSortingOrderChange(viewsSortingOrder);
    });

    this.publishedAtSortingOrderSubs = this.headerBarService.publishedAtSortingOrder$.subscribe(
      (publishedAtSortingOrder): void => {
        this.sortingService.handlePublishedAtSortingOrderChange(publishedAtSortingOrder);
      },
    );

    this.filterSentenceSubs = this.headerBarService.filterSentence$.subscribe((filterSentence): void => {
      this.sortingService.filterBySentence(filterSentence);
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

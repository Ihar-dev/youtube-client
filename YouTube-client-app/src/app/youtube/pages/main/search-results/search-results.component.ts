import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SortingService } from '../../../services/sorting.service';
import { SearchingService } from '../../../services/searching.service';
import { HeaderBarService } from '../../../../core/services/header-bar.service';
import { SearchItem } from '../../../models/search-item.model';
import { HeaderBarModel } from '../../../../core/models/header-bar.model';
import { selectItemsState } from '../../../../redux/selectors/creator.selectors';
import { CreatorStateModel } from '../../../../redux/state.models';

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
  private itemsSubs: Subscription;
  private viewsSortingOrderSubs: Subscription;
  private publishedAtSortingOrderSubs: Subscription;
  private filterSentenceSubs: Subscription;
  public items: SearchItem[];
  private store: Store;
  private cards$: Observable < CreatorStateModel >;
  private cardsSubs: Subscription;

  constructor(headerBarService: HeaderBarService, sortingService: SortingService, searchingService: SearchingService, store: Store) {
    this.store = store;
    this.sortingService = sortingService;
    this.searchingService = searchingService;
    this.headerBarService = headerBarService;
    this.headerBarConditions = headerBarService.headerBarConditions;
    this.cards$ = store.select(selectItemsState);
  }

  ngOnInit(): void {

    this.cardsSubs = this.cards$.subscribe((data: CreatorStateModel): void => {
      this.items = [...data.customCards, ...data.searchItems],
      this.sortingService.items = this.items;
      console.log(this.items);
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
    this.viewsSortingOrderSubs.unsubscribe();
    this.publishedAtSortingOrderSubs.unsubscribe();
    this.filterSentenceSubs.unsubscribe();
    this.cardsSubs.unsubscribe();
  }
}

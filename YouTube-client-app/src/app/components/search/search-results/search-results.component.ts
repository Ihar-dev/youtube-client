import {
  Input,
  Component,
  OnInit,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnChanges {
  @Input() public dataForSearch: string;
  @Input() public SortingBarView: boolean;

  ngOnChanges(): void {
    if (this.dataForSearch) {
      console.log(this.dataForSearch);
    }
  }

  ngOnInit(): void {}
}

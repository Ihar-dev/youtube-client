import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DetailedService } from '../../../services/detailed.service';

import { SearchItem } from '../../../models/search-item.model';

enum Settings {
  sevenDaysDuration = 1000 * 60 * 60 * 24 * 7,
}

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() public item: SearchItem;
  private readonly detailedService: DetailedService;

  constructor(private router: Router, detailedService: DetailedService) {
    this.detailedService = detailedService;
  }

  public showItemDetailed(): void {
    this.detailedService.item = this.item;
    const route = `main/${this.item.id}/detailed`;
    this.router.navigate([route]);
    console.log(this.item);
  }

  public getBorderColor(): string {
    const dateNow = new Date();
    const itemDate = new Date(this.item.snippet.publishedAt);
    if (Number(dateNow) - Number(itemDate) < Settings.sevenDaysDuration) return 'blue';
    const monthDifference = (dateNow.getUTCFullYear() * 12 + dateNow.getUTCMonth())
    - (itemDate.getUTCFullYear() * 12 + itemDate.getUTCMonth());
    if (monthDifference <= 1) {
      if (!monthDifference) return 'green';
      if (dateNow.getUTCDate() < itemDate.getUTCDate()) return 'green';
    }
    if (monthDifference <= 6) {
      if (monthDifference < 6) return 'yellow';
      if (dateNow.getUTCDate() < itemDate.getUTCDate()) return 'yellow';
    }
    return 'red';
  }
}

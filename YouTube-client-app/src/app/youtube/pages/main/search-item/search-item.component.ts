import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DetailedService } from '../../../services/detailed.service';

import { SearchItem } from '../../../models/search-item.model';

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
  }
}

import { Component, OnInit } from '@angular/core';

import { DetailedService } from '../../../services/detailed.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss'],
})
export class DetailedComponent implements OnInit {
  public readonly detailedService: DetailedService;
  public id: string;

  constructor(detailedService: DetailedService) {
    this.detailedService = detailedService;
    this.id = this.detailedService.item.id;
  }

  ngOnInit(): void {
  }
}

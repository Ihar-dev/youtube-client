import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DetailedService } from '../../../services/detailed.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss'],
})
export class DetailedComponent {
  public readonly detailedService: DetailedService;
  public id: string;

  constructor(detailedService: DetailedService, public router: Router) {
    this.detailedService = detailedService;
    this.id = this.detailedService.item.id;
  }
}

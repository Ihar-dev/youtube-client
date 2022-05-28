import {
  Directive, ElementRef, OnInit, Input,
} from '@angular/core';

enum Settings {
  sevenDaysDuration = 1000 * 60 * 60 * 24 * 7,
}

@Directive({
  selector: '[appGetBorderColor]',
})
export class GetBorderColorDirective implements OnInit {
  @Input() public appGetBorderColor = '';

  constructor(private el: ElementRef) {
    this.el = el;
  }

  ngOnInit(): void {
    const dateNow = new Date();
    const itemDate = new Date(this.appGetBorderColor);
    if (Number(dateNow) - Number(itemDate) < Settings.sevenDaysDuration) {
      this.el.nativeElement.style.borderBottom = 'solid 5px blue';
    } else {
      const monthDifference = (dateNow.getUTCFullYear() * 12 + dateNow.getUTCMonth())
      - (itemDate.getUTCFullYear() * 12 + itemDate.getUTCMonth());
      if (monthDifference <= 1) {
        if (!monthDifference) {
          this.el.nativeElement.style.borderBottom = 'solid 5px green';
          return;
        }
        if (dateNow.getUTCDate() < itemDate.getUTCDate()) {
          this.el.nativeElement.style.borderBottom = 'solid 5px green';
          return;
        }
      }
      if (monthDifference <= 6) {
        if (monthDifference < 6) {
          this.el.nativeElement.style.borderBottom = 'solid 5px yellow';
          return;
        }
        if (dateNow.getUTCDate() < itemDate.getUTCDate()) {
          this.el.nativeElement.style.borderBottom = 'solid 5px yellow';
          return;
        }
      }
      this.el.nativeElement.style.borderBottom = 'solid 5px red';
    }
  }
}

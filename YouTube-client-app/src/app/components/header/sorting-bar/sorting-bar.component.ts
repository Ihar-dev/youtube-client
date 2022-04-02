import {
  Input,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-sorting-bar',
  templateUrl: './sorting-bar.component.html',
  styleUrls: ['./sorting-bar.component.scss'],
})
export class SortingBarComponent implements OnInit {
  @Input() public SortingBarView: boolean;

  ngOnInit(): void {}
}

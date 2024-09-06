import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'andteam-merch-page',
  templateUrl: './merch-page.component.html',
  styleUrls: ['./merch-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'andteam-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

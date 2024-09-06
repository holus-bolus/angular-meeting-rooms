import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'andteam-my-space',
  templateUrl: './my-space.component.html',
  styleUrls: ['./my-space.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MySpaceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

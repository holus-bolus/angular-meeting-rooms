import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'andteam-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

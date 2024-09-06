import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

export interface IRoomTemp {
  title: string;
  capacity: string;
  favourite: boolean;
  status: string;
}

export const roomsMock: IRoomTemp[] = [
  {
    title: 'green',
    capacity: '12',
    favourite: true,
    status: '2 hours',
  },
  {
    title: 'yellow',
    capacity: '8',
    favourite: true,
    status: '8 hours',
  },
  {
    title: 'blue',
    capacity: '24',
    favourite: false,
    status: '5 hours',
  },
];

@Component({
  selector: 'andteam-meet-now',
  templateUrl: './meet-now.component.html',
  styleUrls: ['./meet-now.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetNowComponent implements OnInit {

  public rooms: IRoomTemp[];
  public view: 'now' | 'soon' = 'now';

  constructor(private router: Router) {
    this.router.navigate([], { queryParams: { view: this.view } });
  }

  ngOnInit(): void {
    this.rooms = roomsMock;
  }

  goToAvailableNow(): void {
    if (this.view === 'now') {
      return;
    }

    this.view = 'now';
    this.router.navigate([], { queryParams: { view: this.view } });
  }

  goToAvailableSoon(): void {
    if (this.view === 'soon') {
      return;
    }

    this.view = 'soon';
    this.router.navigate([], { queryParams: { view: this.view } });
  }

}

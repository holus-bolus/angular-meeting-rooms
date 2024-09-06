import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITab } from '@interfaces/assessment';

const TAB_ROUTES: Omit<ITab, 'active'>[] = [
  {
    title: 'Rooms',
    key: 'rooms',
  },
  {
    title: 'Meet now',
    key: 'meet-now',
  },
  {
    title: 'My Space',
    key: 'my-space',
  },
  {
    title: 'Map',
    key: 'map',
  },
];

@Component({
  selector: 'andteam-meeting-rooms',
  templateUrl: './meeting-rooms.component.html',
  styleUrls: ['./meeting-rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingRoomsComponent implements OnInit {

  public tabs: ITab[] = [];
  isLazyTabs = false;
  segmentsURL: string[];
  activeTabKey: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeTabKey = this.getActiveTab();
    this.setupTabRoutes(this.activeTabKey);
  }

  public onSelectTab(tab: string): void {
    this.router.navigate([tab], { relativeTo: this.route });
  }

  private getActiveTab(): string {
    this.segmentsURL = this.router.routerState.snapshot.url.split('/');

    return this.getPath(this.segmentsURL);
  }

  private getPath(urlSegments: string[]): string {
    const path = urlSegments[urlSegments.length - 1];
    const pathSegments = path.split('?');
    const isMatrixExist = pathSegments.length === 2;

    return isMatrixExist
      ? pathSegments[0]
      : path;
  }

  private setupTabRoutes(activeTabKey: string): void {
    this.tabs = TAB_ROUTES.map(route => (
      {
        ...route,
        active: route.key === activeTabKey ? true : false,
      }
    ),
    );
  }
}

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IBreadcrumb } from '@interfaces/breadcrumb';

@Component({
  selector: 'andteam-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent {
  @Input() public breadcrumbsList: IBreadcrumb[];
  @Input() public maxItemsVisible: number;
  @Input() public linkTo: string;

  public isBreadcrumbsExpanded = false;

  public onToggleBreadcrumbs(): void {
    this.isBreadcrumbsExpanded = !this.isBreadcrumbsExpanded;
  }
}

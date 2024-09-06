import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'andteam-table-material-projects',
  templateUrl: './table-material-projects.component.html',
  styleUrls: ['./table-material-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableMaterialProjectsComponent {
  @Input() public rowData: any[];
  @Input() public columnDefs: string[];

  @Output() public cellClicked = new EventEmitter<number>();

  public onClick(event: number): void {
    this.cellClicked.emit(event);
  }
}

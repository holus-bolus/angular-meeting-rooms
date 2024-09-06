import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IProjectRow } from '@interfaces/employee';
import { RolesService } from '@services/roles.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'andteam-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent implements OnInit {
  public isEnabledTeamQty$: Observable<boolean>;

  readonly TITLE_POSITION_OF_MANAGER = {
    DeliveryDirector: 'DD',
    DeliveryManager: 'DM',
    ProjectManager: 'PM'
  };

  @Input() project: IProjectRow;

  @Output() cellClicked = new EventEmitter<string>();

  constructor(private rolesService: RolesService) {
  }

  public ngOnInit(): void {
    this.isEnabledTeamQty$ = this.rolesService.isNotEmployee$();
  }

  public onClick(event: string): void {
    this.cellClicked.emit(event);
  }
}

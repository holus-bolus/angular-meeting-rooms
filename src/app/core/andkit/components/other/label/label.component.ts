import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RolesService } from '@services/roles.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'andteam-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AndkitLabelComponent implements OnInit {
  public isEnabled$: Observable<boolean>;

  constructor(private rolesService: RolesService) {}

  public ngOnInit(): void {
    this.isEnabled$ = this.rolesService.isNotEmployee$();
  }
}

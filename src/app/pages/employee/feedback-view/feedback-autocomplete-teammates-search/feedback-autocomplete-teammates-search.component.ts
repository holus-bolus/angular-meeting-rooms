import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { ICommonOption } from '@interfaces/filter';
import { AbstractControl, FormControl } from '@angular/forms';
import { IEmployeeTeammates } from '@interfaces/employee';

@Component({
  selector: 'andteam-feedback-autocomplete-teammates-search',
  templateUrl: './feedback-autocomplete-teammates-search.component.html',
  styleUrls: ['./feedback-autocomplete-teammates-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackAutocompleteTeammatesSearchComponent implements OnInit, AfterViewInit {
  @Input() placeholder: string;
  @Input() option: ICommonOption;
  @Input() error: boolean;
  @Input() approverNameControl: AbstractControl | FormControl;
  @Input() chipsList: IEmployeeTeammates[];
  @Input() employeeId: string;
  @Input() teammates: IEmployeeTeammates[];

  @Output() selectOption = new EventEmitter<IEmployeeTeammates>();

  public filteredTeammates: IEmployeeTeammates[];

  constructor() { }

  public ngOnInit(): void {
    this.filteredTeammates = this.teammates;
    this.filteredTeammates.forEach((teammate) => {
      teammate.name = `${teammate.name}/${teammate.roles[0]}/${teammate.projectNames[0]}`;
    });
  }

  public ngAfterViewInit(): void {
    this.approverNameControl.valueChanges.subscribe((value) => {
      const filterValue = value.toLowerCase();

      this.filteredTeammates = this.teammates.filter(option => option.name.toLowerCase().includes(filterValue));
      if (!this.filteredTeammates.length) this.filteredTeammates = null;
    });
  }

  public onSelectOption(option: IEmployeeTeammates): void {
    this.selectOption.emit(option);
  }
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { ICommonOption } from '@interfaces/filter';
import { AbstractControl, FormControl } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { EmployeeService } from '@services/employee.service';
import { map, switchMap } from 'rxjs/operators';
import { iif, of, timer } from 'rxjs';
import { INITIAL_DELAY } from '@andkit/components/other/loader/loader';
import { IEmployeePhoto, IEmployeeTeammates } from '@interfaces/employee';

@Component({
  selector: 'andteam-feedback-autocomplete-employee-search',
  templateUrl: './feedback-autocomplete-employee-search.component.html',
  styleUrls: ['./feedback-autocomplete-employee-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackAutocompleteEmployeeSearchComponent implements OnInit {
  @Input() placeholder: string;
  @Input() option: IEmployeeTeammates;
  @Input() error: boolean;
  @Input() approverNameControl: AbstractControl | FormControl;
  @Input() chipsList: IEmployeeTeammates[];
  @Input() employeeId: string;

  @Output() selectOption = new EventEmitter<IEmployeeTeammates>();

  public defaultAvatarIcon: SafeHtml;
  public fullNames: IEmployeeTeammates[] = [];

  constructor(
    private employeeService: EmployeeService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.approverNameControl.valueChanges
      .pipe(
        switchMap(value => iif(
          () => value.length >= 3,
          timer(INITIAL_DELAY)
            .pipe(
              switchMap(() => this.employeeService.getTeammatesAndEmployees(this.employeeId, value, false)),
              map(response => response.length
                ? this.createSuggestions(response)
                : null)
            ),
          of([]),
        ))
      )
      .subscribe(
        (fullNames: IEmployeeTeammates[]) => {
          if (fullNames) {
            this.fullNames = fullNames.map((option: IEmployeeTeammates) => {
              if (this.chipsList) {
                this.chipsList.forEach((value) => {
                  if (option.id === value.id) {
                    option.disabled = true;
                  }
                });
              }

              if (option.id === this.employeeId || !option.isEnabled) {
                option.disabled = true;
              }

              option.position = '';

              return { ...option };
            });
          } else {
            this.fullNames = fullNames;
          }

          this.changeDetectorRef.markForCheck();
        }
      );
  }

  public onSelectOption(option: IEmployeeTeammates): void {
    this.selectOption.emit(option);
  }

  private createSuggestions(items: IEmployeePhoto[]): ICommonOption[] {
    return items.map((item) => {
      return {
        ...item,
        photo: item.photo
          ? `data:image/jpeg;base64,${item.photo}`
          : this.defaultAvatarIcon
      };
    });
  }
}

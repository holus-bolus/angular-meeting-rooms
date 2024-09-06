import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IProjectWithFeedbacks } from '@interfaces/feedback.interface';
import { IProject } from '@interfaces/userInfo.interface';
import { cloneDeep, uniqBy } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'andteam-project-feedback-project-filter',
  templateUrl: './project-feedback-project-filter.component.html',
  styleUrls: ['./project-feedback-project-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFeedbackProjectFilterComponent
  implements OnInit, OnDestroy
{
  @Input() public options: IProjectWithFeedbacks[];
  @Output() public checkedOption = new EventEmitter<string>();

  public projects: IProject[];
  public projectsFiltered: IProject[];
  public searchControl = new FormControl('');

  private destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.projects = uniqBy(
      this.options.map(opt => opt.project), 'id');
    this.projectsFiltered = cloneDeep(this.projects);
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: string) => {
        const text = value.toLowerCase();
        if (!value) {
          this.projectsFiltered = cloneDeep(this.projects);
        } else {
          this.projectsFiltered = cloneDeep(this.projects).filter(p =>
            p.name.toLowerCase().startsWith(text),
          );
        }
      });
  }

  public ngOnDestroy(): void {}

  public onCheck(project: IProject): void {
    this.checkedOption.emit(project.id);
  }
}

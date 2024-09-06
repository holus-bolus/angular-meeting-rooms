import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverType, OverTypeGroup } from '@pages/overs-test/overs';
import infoSvg from '!!raw-loader!@andkit/components/inputs/interviewers-feedback/icons/info.svg';
import infoActiveSvg from '!!raw-loader!@andkit/components/inputs/interviewers-feedback/icons/info-active.svg';
import arrowDownBlackSvg from '!!raw-loader!@assets/images/arrow-down-black.svg';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'andteam-overtime-types',
  templateUrl: './overtime-types.component.html',
  styleUrls: ['./overtime-types.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OvertimeTypesComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public overTypeGroups: OverTypeGroup[] = [];
  @Input() public isRemoveSelect: boolean;
  @Input() public canSelectType = true;

  @Output() public overChosen = new EventEmitter<string>();

  public searchControl = new FormControl('');
  public filteredOverTypeGroups: OverTypeGroup[] = [];
  public selectedOverId: string;
  public choosenOvertipeId: string;

  public readonly arrowIcon = arrowDownBlackSvg;
  public readonly infoIcon = infoSvg;
  public readonly infoActiveIcon = infoActiveSvg;

  private destroy$ = new Subject<void>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.filteredOverTypeGroups = this.overTypeGroups;
    this.subscribeOnSearch();
  }

  public ngOnChanges(): void {
    if (this.isRemoveSelect) {
      this.selectedOverId = '';
    }

    if (this.canSelectType && this.choosenOvertipeId) {
      this.selectedOverId = this.choosenOvertipeId;
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onClickOverType(overType: OverType): void {
    if (overType.overTypes?.length) {
      overType.isOpened = !overType.isOpened;
      this.changeDetectorRef.markForCheck();
    } else {
      this.overChosen.emit(overType.id);
      this.choosenOvertipeId = overType.id;

      if (this.canSelectType) {
        this.selectedOverId = overType.id;
      }
    }
  }

  public subscribeOnSearch(): void {
    this.searchControl.valueChanges.pipe(
      takeUntil(this.destroy$),
    )
      .subscribe((value: string) => {
        this.filteredOverTypeGroups = [];
        const sections: OverTypeGroup[] = cloneDeep(this.overTypeGroups);

        if (!value) {
          this.filteredOverTypeGroups = this.overTypeGroups;
        } else {
          // searching in sections
          sections.forEach((section) => {
            const foundOverTypes: OverType[] = [];
            // searching for matches in every group in section
            section.overTypeGroups.forEach((group) => {
              foundOverTypes.push(...this.searchForOvertypesInSection(group, value));
            });

            if (foundOverTypes.length) {
              this.filteredOverTypeGroups.push({
                ...section,
                overTypeGroups: foundOverTypes,
              });
            }
          });
        }

        this.changeDetectorRef.markForCheck();
      });
  }

  private searchForOvertypesInSection(group: OverType, searchString: string): OverType[] {
    const foundOverTypes: OverType[] = [];

    group.isOpened = true;
    if (group.name.toLowerCase().split(' ').find(item => item.indexOf(searchString.toLowerCase()) === 0)) {
      // if group name have a match - need to add whole group
      foundOverTypes.push(group);
    } else if (group.overTypes && group.overTypes.length) {
      // if group name dont match - looking for matches in descendants
      const foundSubOverTypes: OverType[] = [];

      group.overTypes.forEach((subOverType) => {
        if (subOverType.name.toLowerCase().split(' ').find(item => item.indexOf(searchString.toLowerCase()) === 0)) {
          foundSubOverTypes.push(subOverType);
        }
      });

      if (foundSubOverTypes.length) {
        // if we found any descendants - we need to put group and push found descendants in it
        foundOverTypes.push({
          ...group,
          overTypes: foundSubOverTypes,
        });
      }
    }

    return foundOverTypes;
  }
}

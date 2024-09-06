import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import { iif, timer, of } from 'rxjs';
import { INITIAL_DELAY } from '@andkit/components/other/loader/loader';
import { ICommonOption } from '@interfaces/filter';
import { EmployeeService } from '@services/employee.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { IEmployeePhoto } from '@interfaces/employee';
import { Router } from '@angular/router';
import { HeaderTypes } from '@andkit/components/other/header/header';

import searchMenuSvg from '!!raw-loader!../../../../assets/images/search-menu.svg';
import defaultAvatarSvg from '!!raw-loader!./icons/default-avatar.svg';

@Component({
  selector: 'andteam-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent implements OnInit {
  @Input() isScrollableHeader: boolean;
  @Input() headerType: string;

  surname: FormControl;
  fullNames: ICommonOption[] = [];
  searchIcon: SafeHtml;
  defaultAvatarIcon: SafeHtml;
  isSearchFieldOpen = false;
  headerTypes = HeaderTypes;
  isFocus = true;

  constructor(private employeeService: EmployeeService,
              private changeDetectorRef: ChangeDetectorRef,
              private sanitizer: DomSanitizer,
              private router: Router) { }

  public ngOnInit(): void {
    this.surname = new FormControl('');
    this.surname.valueChanges
      .pipe(
        switchMap(value => iif(
          () => value.length >= 3,
          timer(INITIAL_DELAY)
            .pipe(
              switchMap(() => this.employeeService.getEmployeeInfo(value)),
              map(response => response.length
                ? this.createSuggestions(response)
                : null)
            ),
          of([]),
        ))
      )
      .subscribe(
        (fullNames) => {
          this.fullNames = fullNames;
          this.changeDetectorRef.markForCheck();
        }
      );
    this.searchIcon = this.sanitizer.bypassSecurityTrustHtml(searchMenuSvg as any);
    this.defaultAvatarIcon = this.sanitizer.bypassSecurityTrustHtml(defaultAvatarSvg as any);
  }

  public openSearchField(): void {
    this.isSearchFieldOpen = !this.isSearchFieldOpen;
  }

  public closeSearchField(status: boolean): void {
    this.isSearchFieldOpen = status;
  }

  public onSelectOption({ id }: ICommonOption): void {
    this.surname.setValue('');
    this.router.navigate(['/employee', id]);
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

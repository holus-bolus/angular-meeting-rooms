import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { IUserInfo } from '@interfaces/userInfo.interface';
import { UserService } from '@services/user.service';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { linkType } from '@constants/types/linkType.constants';

@Component({
  selector: 'andteam-user-skills-and-contacts',
  templateUrl: './user-skills-and-contacts.component.html',
  styleUrls: ['./user-skills-and-contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSkillsAndContactsComponent implements OnInit, OnDestroy {

  @Input() userInfo: IUserInfo;
  @Input() currentUserId: string;

  public hiddenBirthdayControl: FormControl;
  public hiddenPhoneControl: FormControl;

  readonly linkType = linkType;

  private destroy$ = new Subject();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.hiddenBirthdayControl = new FormControl(this.userInfo.isHideBirthday);
    this.hiddenPhoneControl = new FormControl(this.userInfo.isHidePhone);

    this.hiddenBirthdayControl.valueChanges
      .pipe(
        switchMap((hideBirthday: boolean) => this.userService.setHiddensBirthdayAndPhone<void>({ hideBirthday })),
        takeUntil(this.destroy$),
      ).subscribe();

    this.hiddenPhoneControl.valueChanges
      .pipe(
        switchMap((hidePhone: boolean) => this.userService.setHiddensBirthdayAndPhone<void>({ hidePhone })),
        takeUntil(this.destroy$),
      ).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { SubSink } from 'subsink';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OfficeService } from '@services/office.service';

// tslint:disable-next-line:import-name
import defaultAvatarIcon from '!!raw-loader!./icons/default-avatar.svg';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'andteam-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HeaderComponent implements OnInit, OnDestroy {
  @Input() headerType: string;
  @Output() logoutClick = new EventEmitter();

  public username: string;
  public externalId: string;
  public location: string;
  public avatar: string | ArrayBuffer;
  public defaultAvatar: SafeHtml;

  private subscriptions = new SubSink();

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private officeService: OfficeService,
    private sanitizer: DomSanitizer) { }

  public ngOnInit(): void {
    this.subscriptions.sink = this.userService.getUserInfo$()
      .pipe(
        tap(
          ({ externalId, photo }) => {
            this.externalId = externalId;
            const avatar = `data:image/jpeg;base64,${photo}`;

            if (photo) {
              this.avatar = avatar;
            } else {
              this.defaultAvatar = this.sanitizer.bypassSecurityTrustHtml(defaultAvatarIcon as any);
            }
          }),
        catchError(() => of({ username: '' }))
      )
      .subscribe(({ username }) => {
        this.username = username;
        this.changeDetectorRef.markForCheck();
      });

    this.subscriptions.sink = this.officeService.getMyOffice$()
      .subscribe(({ name }) => {
        this.location = name;
      });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

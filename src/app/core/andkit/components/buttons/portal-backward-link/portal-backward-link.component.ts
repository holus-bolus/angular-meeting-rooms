import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import arrowBackSvg from '!!raw-loader!./icons/arrow-back.svg';

const INITIAL_NAVIGATION_ID = 1;

@Component({
  selector: 'andteam-portal-backward-link',
  templateUrl: './portal-backward-link.component.html',
  styleUrls: ['./portal-backward-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalBackwardLinkComponent implements OnInit {
  @Input() path: string;
  @Input() fragment: string;
  @Input() isStatic = false;
  @Input() isNeedConfirm = false;
  @Output() linkClick = new EventEmitter<void>();

  backIcon: SafeHtml;

  constructor(private sanitizer: DomSanitizer,
              private location: Location,
              private router: Router) { }

  public ngOnInit(): void {
    this.backIcon = this.sanitizer.bypassSecurityTrustHtml(arrowBackSvg as any);
  }

  public goToPage(): void {
    const { navigationId } = window.history.state;

    if (navigationId === INITIAL_NAVIGATION_ID || this.isStatic) {
      this.router.navigate([this.path], { fragment: this.fragment });
    } else {
      this.location.back();
    }
  }

  public onLinkClick(): void {
    if (!this.isNeedConfirm) {
      this.goToPage();
    } else {
      this.linkClick.emit();
    }
  }
}

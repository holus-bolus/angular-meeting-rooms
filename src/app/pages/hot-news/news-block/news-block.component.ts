import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { INewsRow } from '@interfaces/news';
import { ITechnologyStackTags } from '@interfaces/employee';
import { Observable } from 'rxjs';
import { RolesService } from '@services/roles.service';
import { PORTAL_CONFIRMATION } from '@constants/modals/confirmation';

import eyeOpenSvg from '!!raw-loader!./icons/eye-open.svg';

@Component({
  selector: 'andteam-news-block',
  templateUrl: './news-block.component.html',
  styleUrls: ['./news-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsBlockComponent implements OnInit {
  @Input() public pieceNews: INewsRow;
  @Input() public pieceNewsPage: boolean;

  @Output() public sendEvent = new EventEmitter<void>();
  @Output() public deletion = new EventEmitter<string>();
  @Output() public search = new EventEmitter<string>();

  public eyeOpenIcon: string = eyeOpenSvg;
  public isOpenConfirmationModal = false;
  public isShowEditMenu$: Observable<boolean>;
  public title = PORTAL_CONFIRMATION.TITLE;
  public subTitle = PORTAL_CONFIRMATION.SUB_TITLE;

  constructor(private rolesService: RolesService) {}

  public ngOnInit(): void {
    this.isShowEditMenu$ = this.rolesService.isAdminContentManager$();
  }

  public onOpenConfirmationModal(): void {
    this.isOpenConfirmationModal = !this.isOpenConfirmationModal;
  }

  public onDelete({ id }: INewsRow): void {
    this.deletion.emit(id);
  }

  public searchByTag({ name }: ITechnologyStackTags): void {
    this.search.emit(name);
  }
}

import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { MaterialInfoBtnConst } from '@andkit/components/buttons/material-info-btn/material-info-btn.const';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IOneToOne, IOneToOneUpdate } from '@interfaces/one-to-one';
import { ddMMyyyy, hhMM } from '@constants/date-pipe.const';

import closeSmallSvg from '!!raw-loader!@assets/images/closeSmall.svg';

@Component({
  selector: 'andteam-one-to-one-view-modal',
  templateUrl: './one-to-one-view-modal.component.html',
  styleUrls: ['./one-to-one-view-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class OneToOneViewModalComponent {

  public yellow = MaterialInfoBtnConst.YELLOW;
  public btnText = 'i';
  public dateTimeType = `${ddMMyyyy}, ${hhMM}`;
  public dateType = ddMMyyyy;

  readonly closeIcon = closeSmallSvg;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { oneToOne: IOneToOne }) { }
}

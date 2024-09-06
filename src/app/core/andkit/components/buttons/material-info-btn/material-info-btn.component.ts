import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MaterialInfoBtnConst } from '@andkit/components/buttons/material-info-btn/material-info-btn.const';

@Component({
  selector: 'andteam-material-info-btn',
  templateUrl: './material-info-btn.component.html',
  styleUrls: ['./material-info-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialInfoBtnComponent {
  @Input() btnColor: string;
  @Input() btnText: string;
  @Input() btnSize: string;

  @Output() btnClick = new EventEmitter();

  // Создан enum MaterialInfoBtnConst в этой папке, туда добавляем название стилей и в CSS их стили
  public btnStyle = MaterialInfoBtnConst;

  public onBtnClick(): void {
    this.btnClick.emit();
  }
}

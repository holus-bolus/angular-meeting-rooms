import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IOption } from '@interfaces/filter';

@Component({
  selector: 'andteam-settings-multiselect',
  templateUrl: './settings-multiselect.component.html',
  styleUrls: ['./settings-multiselect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsMultiselectComponent implements OnInit {
  @Input() selectIcon: string;
  @Input() selectName: string;
  @Input() selectList: IOption[];
  @Output() makeSelect: EventEmitter<IOption> = new EventEmitter<IOption>();

  public columns = new FormControl();

  constructor() { }

  public ngOnInit(): void {
    this.columns.setValue([]);
    this.selectList.map((value: IOption) => {
      if (value.checked) {
        this.columns.setValue([...this.columns.value, value.name]);
      }
    });
  }

  public changeSelect(select: IOption): void {
    if (!select.disabled) {
      select.checked = !select.checked;
      this.makeSelect.emit(select);
    }
  }
}

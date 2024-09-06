import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ICandidate } from '@interfaces/candidate';
import { ITab } from '@interfaces/assessment';

@Component({
  selector: 'andteam-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
  @Input() tabs: ITab[];
  @Input() allCandidates: ICandidate[];
  @Input() isLazyTabs: boolean;

  @Output() selectTab = new EventEmitter<string>();

  public onSelectTab({ key }: ITab): void {
    if (!this.isLazyTabs) {
      this.tabs = this.tabs.map((tab: ITab) => {
        return {
          ...tab,
          active: tab.key === key
        };
      });
    }
    this.selectTab.emit(key);
  }
}

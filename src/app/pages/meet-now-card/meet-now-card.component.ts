import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IRoomTemp } from '@pages/meeting-rooms/meet-now/meet-now.component';
import { BUTTON_TYPES } from '@andkit/components/buttons/button/button.config';
import favoriteSvg from '!!raw-loader!./icons/favorite.svg';
import favoriteDisabledSvg from '!!raw-loader!./icons/favorite-disabled.svg';

@Component({
  selector: 'andteam-meet-now-card',
  templateUrl: './meet-now-card.component.html',
  styleUrls: ['./meet-now-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetNowCardComponent implements OnInit {
  @Input() room: IRoomTemp;

  favoriteIcon: string;

  public buttonType = BUTTON_TYPES;

  ngOnInit(): void {
    this.favoriteIcon = this.room.favourite ? favoriteSvg : favoriteDisabledSvg;
  }

  toggleFavorite(): void {
    this.room.favourite = !this.room.favourite;
    this.favoriteIcon = this.room.favourite ? favoriteSvg : favoriteDisabledSvg;
  }

}

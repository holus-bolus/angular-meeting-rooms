import { Directive, HostListener, Input } from '@angular/core';
import { CURRENCIES } from '@constants/currencies';

@Directive({
  selector: '[andteamInputMask]'
})
export class InputMaskDirective {
  public count = 0;

  @Input() public andteamInputMask: string | CURRENCIES;

  @HostListener('input', ['$event'])
  public onInputChanges(event: any): void {
    if (!this.andteamInputMask) {
      return;
    }

    const unmaskedValue = event.target.value.split('').filter(char => Number(char)).join('');

    event.target.value = unmaskedValue + this.andteamInputMask;
  }

}

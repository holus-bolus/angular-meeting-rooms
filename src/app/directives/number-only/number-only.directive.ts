import { Directive, HostListener } from '@angular/core';
import { SPECIAL_KEYS } from '@constants/keyboard.constants';

@Directive({
  selector: '[andteamNumberOnly]'
})
export class NumberOnlyDirective {
  @HostListener('keydown', ['$event'])
  public onKeyDown(event: any): void {
    const selectionStart = event.target.selectionStart;
    const selectionEnd = event.target.selectionEnd;
    const numberRegExp = new RegExp('^[0-9]*$');

    let inputText = event.target.value + event.key;

    if (selectionStart !== selectionEnd) {
      const eventTargetValue = event.target.value;

      inputText = eventTargetValue.slice(0, selectionStart) + event.key + eventTargetValue.slice(selectionEnd, inputText.length);
    }

    if (SPECIAL_KEYS.includes(event.key)) { return; }

    if (!numberRegExp.test(inputText)) {
      event.preventDefault();
    }
  }
}

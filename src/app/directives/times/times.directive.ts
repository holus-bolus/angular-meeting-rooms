import { Directive, HostListener, Input } from '@angular/core';
import { SPECIAL_KEYS } from '@constants/keyboard.constants';

@Directive({
  selector: '[andteamTime]'
})
export class TimesDirective {
  @Input() selectionStartRegExp: string;
  @Input() selectionEndRegExp: string;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: any): void {
    const selectionStart = event.target.selectionStart;
    const selectionEnd = event.target.selectionEnd;
    const selectionStartRegExp = new RegExp(this.selectionStartRegExp);
    const selectionEndRegExp = new RegExp(this.selectionEndRegExp);

    let inputText = event.target.value + event.key;

    if (selectionStart !== selectionEnd) {
      const eventTargetValue = event.target.value;

      inputText = eventTargetValue.slice(0, selectionStart) + event.key + eventTargetValue.slice(selectionEnd, inputText.length);
    }

    if (SPECIAL_KEYS.includes(event.key)) {
      return;
    }

    if (!selectionStartRegExp.test(inputText[0]) || (!!inputText[1] && !selectionEndRegExp.test(inputText[1])) || inputText.length > 2) {
      event.preventDefault();
    }
  }
}

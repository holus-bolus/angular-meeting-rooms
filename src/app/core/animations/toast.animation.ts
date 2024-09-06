import { animate, state, style, transition, trigger } from '@angular/animations';

export const toastInOutAnimation = trigger('InOut', [
  state('page', style({ bottom: '20px', opacity: '1' })),
  state('bottom', style({ bottom: '0', opacity: '0' })),
  state('right', style({ right: '-100px', opacity: '0' })),
  transition('bottom => page', animate('500ms ease-in')),
  transition('page => right', animate('500ms ease-in')),
]);

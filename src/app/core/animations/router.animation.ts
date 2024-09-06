import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const fromLeftToRight = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter', [
    style({ left: '100%' })
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('500ms ease-out', style({ left: '-100%' }))
    ]),
    query(':enter', [
      animate('500ms ease-out', style({ left: '0%' }))
    ])
  ]),
  query(':enter', animateChild()),
];

export const fromRightToLeft = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter', [
    style({ left: '-100%' })
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('500ms ease-out', style({ left: '100%' }))
    ]),
    query(':enter', [
      animate('500ms ease-out', style({ left: '0%' }))
    ])
  ]),
  query(':enter', animateChild()),
];

export const routeSlideAnimation =
  trigger('routeAnimations', [
    transition('login => main', fromLeftToRight),
    transition('main => login', fromRightToLeft),
    transition('main => employee-list', fromLeftToRight),
    transition('employee-list => main', fromRightToLeft),
    transition('main => employee', fromLeftToRight),
    transition('employee => main', fromRightToLeft),
    transition('employee-list => employee', fromLeftToRight),
    transition('employee => employee-list', fromRightToLeft),
    transition('login => employee-list', fromLeftToRight),
    transition('employee-list => login', fromRightToLeft),
    transition('login => employee', fromLeftToRight),
    transition('employee => login', fromRightToLeft),
    transition('main => hot-news', fromLeftToRight),
    transition('main => piece-news', fromLeftToRight),
    transition('piece-news => main', fromRightToLeft),
    transition('hot-news => main', fromRightToLeft),
    transition('main => piece-news', fromLeftToRight),
    transition('piece-news => main', fromRightToLeft),
    transition('main => add-event', fromLeftToRight),
    transition('add-event => main', fromRightToLeft),
    transition('main => create-event', fromLeftToRight),
    transition('create-event => main', fromRightToLeft),
    transition('main => event', fromLeftToRight),
    transition('event => main', fromRightToLeft),
    transition('event => edit-event', fromLeftToRight),
    transition('edit-event => event', fromRightToLeft),
    transition('add-news => hot-news', fromRightToLeft),
    transition('hot-news => add-news', fromLeftToRight),
    transition('main => add-news', fromLeftToRight),
    transition('add-news => main', fromRightToLeft),
    transition('employee-list => hot-news', fromRightToLeft),
    transition('hot-news => employee-list', fromLeftToRight),
    transition('employee => hot-news', fromRightToLeft),
    transition('hot-news => employee', fromLeftToRight),
    transition('edit-news => piece-news', fromRightToLeft),
    transition('piece-news => edit-news', fromLeftToRight),
    transition('employee-list => add-news', fromRightToLeft),
    transition('add-news => employee-list', fromLeftToRight),
    transition('employee => add-news', fromRightToLeft),
    transition('add-news => employee', fromLeftToRight),
    transition('hot-news => login', fromRightToLeft),
    transition('add-news => login', fromRightToLeft),
    transition('employee-list => edit-news', fromRightToLeft),
    transition('edit-news => employee-list', fromLeftToRight),
    transition('edit-news => hot-news', fromRightToLeft),
    transition('hot-news => edit-news', fromLeftToRight),
    transition('main => edit-news', fromLeftToRight),
    transition('edit-news => main', fromRightToLeft),
    transition('employee => edit-news', fromRightToLeft),
    transition('edit-news => employee', fromLeftToRight),
    transition('edit-news => login', fromRightToLeft),
    transition('main => assessment', fromLeftToRight),
    transition('assessment => main', fromRightToLeft),
  ]);

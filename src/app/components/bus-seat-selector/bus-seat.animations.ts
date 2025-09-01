import { trigger, state, style, transition, animate } from '@angular/animations';

export const seatAnimations = [
  trigger('seatState', [
    state('available', style({
      opacity: 1,
      transform: 'scale(1)'
    })),
    state('selected', style({
      opacity: 1,
      transform: 'scale(1.05)'
    })),
    state('unavailable', style({
      opacity: 0.7
    })),
    transition('* => selected', animate('200ms ease-in')),
    transition('* => available', animate('200ms ease-out')),
    transition('* => unavailable', animate('200ms ease-out'))
  ]),
  trigger('busLayout', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms ease-out', style({ opacity: 1 }))
    ])
  ])
];

export const tooltipAnimations = [
  trigger('tooltip', [
    state('visible', style({
      opacity: 1,
      transform: 'translateY(0)'
    })),
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(10px)' }),
      animate('200ms ease-out')
    ]),
    transition(':leave', [
      animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
    ])
  ]),
  trigger('legendItem', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(10px)' }),
      animate('300ms 300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
  ])
];

export const fadeInAnimation = [
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms ease-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      animate('300ms ease-in', style({ opacity: 0 }))
    ])
  ])
];

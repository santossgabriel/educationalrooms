import { trigger, state, animate, style, transition } from '@angular/animations'

export const routerTransition =
  trigger('routerTransition', [
    transition(':enter', [
      style({ transform: 'translateX(200%)', position: 'fixed', width: '100%' }),
      animate('0.6s ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0%)', position: 'fixed', width: '100%' }),
      animate('0.6s ease-in-out', style({ transform: 'translateX(-200%)' }))
    ])
  ])

export const fadeInTransition =
  trigger('fadeInTransition', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.6s', style({ opacity: 1 }))
    ])
  ])
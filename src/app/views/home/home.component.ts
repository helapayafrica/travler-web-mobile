import {Component, OnInit} from '@angular/core';

import {PartnersComponent} from './sections/partners/partners.component';
import {TestimonialsComponent} from './sections/testimonials/testimonials.component';
import {CouponsComponent} from './sections/coupons/coupons.component';

import { AppsComponent } from './sections/apps/apps.component';
import { HeroSectionComponent } from "./sections/hero-section/hero-section.component";

import {FAQSComponent} from './sections/faqs/faqs.component';
import {AnimateOnScroll} from 'primeng/animateonscroll';
import { animate, style, group, useAnimation, keyframes, animation, query, stagger } from "@angular/animations";

import {GenericSkeletonComponent} from '../../shared/skeleton/home-generic-skeleton';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-view-home',
  standalone: true,
  imports: [
    PartnersComponent,
    TestimonialsComponent,
    CouponsComponent,
    AppsComponent,
    HeroSectionComponent,
    GenericSkeletonComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements  OnInit{

  grow = animation(
    [
      style({height: '0px', paddingTop: '0px', paddingBottom: '0px', marginTop: '0px', marginBottom: '0px'}),
      animate('200ms', style({ height: '*', paddingTop: '*', paddingBottom: '*', marginTop: '*', marginBottom: '*' })),
    ],
  );
  animate = [
    query('*', [
      style({transformOrigin: '50% 0px', transform: 'perspective(500px) rotate3d(1, 0, 0, 90deg)' }),
      stagger(100, [
        group([
          useAnimation(this.grow),
          animate('1000ms',
            keyframes([
              style({transform: 'perspective(500px) rotate3d(1, 0, 0, -70deg)' }),
              style({transform: 'perspective(500px) rotate3d(1, 0, 0, 40deg)' }),
              style({transform: 'perspective(500px) rotate3d(1, 0, 0, -15deg)' }),
              style({transform: 'perspective(500px) rotate3d(1, 0, 0, 0deg)' }),
            ]),
          ),
        ]),
      ])
    ])
  ];
  animate2 =  [
    query('div', [
      stagger(500, [
        animate('2000ms', style({ transform: 'scale(2)'}))
      ])
    ])
  ];

  loadingStates = {
    heroSection: true,
    coupons: true,
    testimonials: true,
    blog: true,
    howToBook: true,
    partners: true,
    faqs: true,
    apps: true
  };

  // Configuration for each skeleton type
  skeletonConfigs = {
    hero: {
      type: 'hero' as const,
      showTitle: false,
      showReturnDate: false, // Set to true for round trip
      height: 'lg' as const,
      containerClass: 'py-4'
    },
    coupons: {
      type: 'cards' as const,
      showTitle: true,
      itemsCount: 3,
      columns: 3,
      hasImage: false,
      hasButton: true,
      height: 'md' as const,
      containerClass: 'py-5 bg-light'
    },
    testimonials: {
      type: 'testimonials' as const,
      showTitle: true,
      itemsCount: 3,
      columns: 3,
      height: 'md' as const
    },
    blog: {
      type: 'blog' as const,
      showTitle: true,
      itemsCount: 3,
      columns: 3,
      hasImage: true,
      hasButton: true,
      height: 'md' as const
    },
    howToBook: {
      type: 'list' as const,
      showTitle: true,
      itemsCount: 4,
      height: 'sm' as const,
      containerClass: 'py-5'
    },
    partners: {
      type: 'partners' as const,
      showTitle: true,
      itemsCount: 6,
      columns: 6,
      hasImage: true,
      hasButton: false,
      height: 'sm' as const
    },
    faqs: {
      type: 'faqs' as const,
      showTitle: true,
      itemsCount: 5,
      height: 'sm' as const,
      containerClass: 'py-5 bg-light'
    },
    apps: {
      type: 'apps' as const,
      showTitle: true,
      itemsCount: 2,
      height: 'md' as const
    }
  };

  ngOnInit() {
    this.loadComponentsSequentially();
  }

  private loadComponentsSequentially() {
    setTimeout(() => this.loadingStates.heroSection = false, 800);
    setTimeout(() => this.loadingStates.coupons = false, 1200);
    setTimeout(() => this.loadingStates.testimonials = false, 1600);
    setTimeout(() => this.loadingStates.blog = false, 2000);
    setTimeout(() => this.loadingStates.howToBook = false, 2400);
    setTimeout(() => this.loadingStates.partners = false, 2800);
    setTimeout(() => this.loadingStates.faqs = false, 3200);
    setTimeout(() => this.loadingStates.apps = false, 3600);
  }

  onComponentLoaded(componentName: keyof typeof this.loadingStates) {
    this.loadingStates[componentName] = false;
  }
}

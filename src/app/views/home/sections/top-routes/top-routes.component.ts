import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {AnalyticsComponent} from '../analytics/analytics.component';

interface RouteGroup {
  title: string;
  routes: Route[];
}

interface Route {
  origin: string;
  destination: string;
}

@Component({
  selector: 'app-home-top-routes',
  templateUrl: './top-routes.component.html',
  standalone: true,
  imports: [
    NgForOf,
    AnalyticsComponent
  ],
  styleUrls: ['./top-routes.component.scss']
})

export class TopRoutesComponent {
  routeGroups: RouteGroup[] = [
    {
      title: 'From Nairobi',
      routes: [
        { origin: 'Nairobi', destination: 'Mombasa' },
        { origin: 'Nairobi', destination: 'Kigali' },
        { origin: 'Nairobi', destination: 'Kampala' },
        { origin: 'Nairobi', destination: 'Malindi' }
      ]
    },
    {
      title: 'From Mombasa',
      routes: [
        { origin: 'Mombasa', destination: 'Nairobi' },
        { origin: 'Mombasa', destination: 'Kisumu' },
        { origin: 'Mombasa', destination: 'Mumias' }
      ]
    },
    {
      title: 'From Kampala',
      routes: [
        { origin: 'Mombasa', destination: 'Malaba' },
        { origin: 'Mombasa', destination: 'Migori' },
        { origin: 'Mombasa', destination: 'Kitui' },
        { origin: 'Kampala', destination: 'Nairobi' }
      ]
    },
    {
      title: 'From Garissa',
      routes: [
        { origin: 'Garissa', destination: 'Nairobi' },
        { origin: 'Garissa', destination: 'Matuu' },
        { origin: 'Garissa', destination: 'Thika' },
        { origin: 'Garissa', destination: 'Mwingi' }
      ]
    },
    {
      title: 'From Kitui',
      routes: [
        { origin: 'Kitui', destination: 'Mombasa' },
        { origin: 'Kitui', destination: 'Mariakani' },
        { origin: 'Kitui', destination: 'Voi' },
        { origin: 'Malindi', destination: 'Nairobi' }
      ]
    }
  ];



}

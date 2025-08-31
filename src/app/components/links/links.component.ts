import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-component-link',
  standalone: true,
  imports: [],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss'
})
export class LinksComponent {
  @Input() title: string | undefined;
  @Input() href: string | undefined;
  @Input() linkClass: string | undefined;
}

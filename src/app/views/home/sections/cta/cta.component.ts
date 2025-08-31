import { Component } from '@angular/core';
import {LinksComponent} from '../../../../components/links/links.component';


@Component({
  selector: 'app-home-cta',
  standalone: true,
  imports: [
    LinksComponent
  ],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CtaComponent {

}

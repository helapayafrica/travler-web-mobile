import {Component, inject} from '@angular/core';
import {SearchComponent} from '../../../../shared/search/search.component';

import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    SearchComponent
  ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

  // messageService = inject(MessageService)
  // message =  this.messageService.getMessage()

}

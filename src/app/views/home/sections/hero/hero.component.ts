import {Component} from '@angular/core';
import {SearchComponent} from '../../../../shared/search/search.component';


@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [
    SearchComponent
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',

})
export class HeroComponent {

}

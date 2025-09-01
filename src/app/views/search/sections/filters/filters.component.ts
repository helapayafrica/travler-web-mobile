import {Component} from '@angular/core';
import {FiltersComponent as FiltersDrawerComponent} from '../drawer/filters/filters.component';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [
    FiltersDrawerComponent,
    FiltersDrawerComponent
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {

}

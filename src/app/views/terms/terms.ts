import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-terms',
  imports: [
    TranslatePipe,
    CommonModule,
  ],
  templateUrl: './terms.html',
  styleUrl: './terms.scss'
})
export class Terms {

}

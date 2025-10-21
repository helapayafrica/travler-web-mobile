import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {IsArrayPipe} from '../../utils/Pipes/is-array-pipe';

@Component({
  selector: 'app-terms',
  imports: [
    TranslatePipe,
    CommonModule,
    IsArrayPipe
  ],
  templateUrl: './terms.html',
  styleUrl: './terms.scss'
})
export class Terms {

}

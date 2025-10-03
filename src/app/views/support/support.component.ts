import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';


@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    TranslatePipe
  ],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent {


}

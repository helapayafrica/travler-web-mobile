import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-shared-logo',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
 @Input() imageNo : number = 2
}

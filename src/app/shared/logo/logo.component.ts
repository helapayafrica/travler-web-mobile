import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: ' app-shared-logo',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
 @Input() imageNo : number = 2
}

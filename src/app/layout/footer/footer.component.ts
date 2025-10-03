import { Component } from '@angular/core';
import {LogoComponent} from '../../shared/logo/logo.component';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-layout-footer',
  standalone: true,
  imports: [
    LogoComponent,
    CommonModule,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
date=new Date();
}

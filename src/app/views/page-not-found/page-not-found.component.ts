import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    TranslatePipe
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  constructor(private route:Router, private location:Location) {
  }


  goBack(){
    this.location.back()
  }

  goHome(){
     this.route.navigate(['/'])
  }

}

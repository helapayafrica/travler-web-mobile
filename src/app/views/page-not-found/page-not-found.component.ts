import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
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

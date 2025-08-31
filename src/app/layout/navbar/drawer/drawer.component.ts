import {Component, inject, TemplateRef} from '@angular/core';
import {NgbDatepickerModule, NgbDropdownItem, NgbOffcanvas, OffcanvasDismissReasons,} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { LogoComponent } from "../../../shared/logo/logo.component";
import {AuthService} from '../../../services/auth';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-layout-navbar-drawer',
  standalone: true,
  imports: [NgbDatepickerModule, RouterLink, LogoComponent, CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  private offcanvasService = inject(NgbOffcanvas);
  closeResult = '';
  loggedIn:any=false;
  user:any={};
  isAgent:boolean=false;

  constructor(public authService:AuthService) {
    this.authService.isLoggedIn$.subscribe((res : any)=>{
      this.loggedIn=res;
    })
    this.user=this.authService.getCurrentUser();
    console.log(this.user);
  }




  open(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, {ariaLabelledBy: 'offcanvas-basic-title'})
      .result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  logout(){
    this.authService.logout()
  }
}

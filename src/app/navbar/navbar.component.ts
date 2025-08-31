import {Component, HostListener} from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
import {DrawerComponent} from './drawer/drawer.component';
import {CommonModule, NgClass} from '@angular/common';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {LogoComponent} from '../shared/logo/logo.component';
import {ModalService} from '../services/modal';
import {AuthService} from '../services/auth';


@Component({
  selector: 'app-layout-navbar',
  standalone: true,
  imports: [
    LogoComponent,
    RouterLink,
    DrawerComponent,
    NgbDropdownModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  expandedNav = false;
  loggedIn:any=false;
  user:any={};

  //added a boolean to determin if angent or customer
  isAgent:boolean=false;
  constructor(public modalService:ModalService,public authService:AuthService){
    this.authService.isLoggedIn$.subscribe((res)=>{
      this.loggedIn=res;
    })
    this.user=this.authService.getCurrentUser();
    console.log(this.user);
  }



  ngOnInit() {
    this.onScroll();
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(e?: any) {
    this.expandedNav = !(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200);
  }
  open(){
    this.modalService.openModal('loginModal');
  }
logout(){
  this.authService.logout()
}
}

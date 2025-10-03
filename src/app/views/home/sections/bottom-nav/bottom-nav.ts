import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {Drawer} from 'primeng/drawer';
import {Button, ButtonDirective} from 'primeng/button';
import {AuthService} from '../../../../services/auth';
import {NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-bottom-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    Drawer,
    NgIf,
    TranslatePipe,
  ],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss'
})
export class BottomNav {
  visible: boolean = false;
  loggedIn:any=false;
  user:any={};
  router = inject(Router)

  constructor(public authService: AuthService,) {
    this.authService.isLoggedIn$.subscribe((res) => {
      this.loggedIn=res
    })

    this.user = this.authService.getCurrentUser()
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/'])
  }

}

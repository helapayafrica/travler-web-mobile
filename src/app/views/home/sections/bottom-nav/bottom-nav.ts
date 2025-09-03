import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Drawer} from 'primeng/drawer';
import {Button, ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-bottom-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    Drawer,
  ],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss'
})
export class BottomNav {
  visible: boolean = false;

}

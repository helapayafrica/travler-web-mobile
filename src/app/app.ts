import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginModalComponent} from './shared/login-modal/login-modal.component';
import {FooterComponent} from './layout/footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginModalComponent, FooterComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('travler-mobile');
}

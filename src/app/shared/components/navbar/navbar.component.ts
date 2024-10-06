import { Component, signal } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showProfileMenu = signal(false);
  showMobileMenu = signal(false);

  toggleProfileMenu() {
    this.showProfileMenu.update((prevState) => !prevState);
  }
  toggleMobileMenu() {
    this.showMobileMenu.update((prevState) => !prevState);
  }
}

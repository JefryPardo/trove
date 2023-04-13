import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  items: MenuItem[];

  constructor() {

    this.items = [
      {
        label: 'item',
        icon: 'pi pi-star',
        routerLink: ['/item']
      },
      {
        label: 'buy',
        icon: 'pi pi-shopping-cart',
        routerLink: ['/buy']
      },
      {
        label: 'sell',
        icon: 'pi pi-money-bill',
        routerLink: ['/sell']
      },
      {
        label: 'inventory',
        icon: 'pi pi-chart-bar',
        routerLink: ['/inventory']
      }
    ];
  }

}

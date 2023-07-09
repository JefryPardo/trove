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
        icon: 'pi pi-box',
        routerLink: ['/inventory']
      },
      {
        label: 'flipping',
        icon: 'pi pi-chart-line',
        items: [
            {
              label: 'Flipping',
              icon: 'pi pi-plus-circle',
              routerLink: ['/flipping']
            },
            {
              label: 'Search flipping',
              icon: 'pi pi-search',
              routerLink: ['/search_flipping']
            }
        ],
      },
      {
        label: 'calculator',
        icon: 'pi pi-box',
        routerLink: ['/calculator']
      }
    ];
  }

}

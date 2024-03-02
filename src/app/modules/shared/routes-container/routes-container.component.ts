import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
interface RouteItem {
  label: string;
  route: string;
}

interface PanelItem {
  header: string;
  routes: RouteItem[];
  active: boolean;
}

@Component({
  selector: 'app-routes-container',
  templateUrl: './routes-container.component.html',
  styleUrls: ['./routes-container.component.css'],
})
export class RoutesContainerComponent {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  panelItems: PanelItem[] = [
    {
      header: '',
      routes: [{ label: 'Gösterge Paneli', route: '/dashboard' }],
      active: false,
    },
    {
      header: 'Alıcı Müşteri Yönetimi',
      routes: [{ label: 'Alıcı Müşteri İşlemleri', route: '/customer' }],
      active: false,
    },
    {
      header: 'Araç Yönetimi',
      routes: [{ label: 'Araç İşlemleri', route: '/vehicle' }],
      active: false,
    },
    {
      header: 'Batch Yönetimi',
      routes: [{ label: 'Batch İşlemleri', route: '/seller-batch' }],
      active: false,
    },
    {
      header: 'Depo Yönetimi',
      routes: [
        { label: 'Envanter', route: '/inventory' },
        { label: 'Stok Kontrolü', route: '/stock-control' },
      ],
      active: false,
    },
    {
      header: 'Finans Yönetimi',
      routes: [{ label: 'Finans İşlemleri', route: '/finance' }],
      active: false,
    },
    {
      header: 'Paket Yönetimi',
      routes: [{ label: 'Paket İşlemleri', route: '/package' }],
      active: false,
    },
    {
      header: 'Personel Yönetimi',
      routes: [{ label: 'Kuryeler', route: '/carrier' }],
      active: false,
    },
    {
      header: 'Satıcı Yönetimi',
      routes: [
        { label: 'Satıcı İşlemleri', route: '/seller' },
        { label: 'Satıcı Çalışanı İşlemleri', route: '/seller-employee' },
      ],
      active: false,
    },
    {
      header: 'Teslimat İşlemleri',
      routes: [
        { label: 'Gönderimler', route: '/deliveries' },
        { label: 'İadeler', route: '/returns' },
      ],
      active: false,
    },
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkActiveRoute();
      }
    });
  }
  checkActiveRoute() {
    const currentRoute = this.router.url;
    for (const link of this.panelItems) {
      if (currentRoute.includes(link.routes[0].route)) {
        link.active = true;
      } else {
        link.active = false;
      }
    }
  }
  toggle() {
    this.sidenav?.toggle();
  }
}

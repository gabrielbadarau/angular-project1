import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Project1';

  headerItems: MenuItem[] = [];
  sideItems: MenuItem[]=[];

  visibleSidebar1:boolean=false;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {

   this.primengConfig.ripple = true;

    this.headerItems = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink:'/'},
      {label: 'About Us', icon: 'pi pi-fw pi-info-circle'},
      {label: 'Contact', icon: 'pi pi-fw pi-send'}
    ];

    this.sideItems = [
      {
        label: 'Navigate',
          items: [{
              label: 'Transactions', 
            },
            {
              label: 'Router',
           
            }
          ]
        }
    ];
  }
}

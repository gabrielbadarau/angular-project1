import { Component, OnInit } from '@angular/core';
import { Itransactions } from 'src/app/transactions/transactions';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  transactions: Itransactions[];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getTransactions().subscribe({
      next: (transactions) => (this.transactions = transactions),
      error: (error) => console.error(error),
    });
  }
}

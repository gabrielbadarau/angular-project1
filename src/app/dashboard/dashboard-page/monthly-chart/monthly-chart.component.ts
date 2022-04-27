import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { DateService } from 'src/app/shared/date.service';
import { Itransactions } from 'src/app/transactions/transactions';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-monthly-chart',
  templateUrl: './monthly-chart.component.html',
  styleUrls: ['./monthly-chart.component.css'],
})
export class MonthlyChartComponent implements OnInit {
  @Input() transactions: Itransactions[];

  public barChartOptions: ChartConfiguration['options'] = {
    plugins: {
      title: {
        display: true,
        text: 'Monthly Chart (last 4 weeks)',
      },
    },
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'No. of transactions' }],
  };

  constructor(private dashboardService: DashboardService, private dateService: DateService) {}

  ngOnInit(): void {
    const transactionDatesStrings = this.dashboardService.getTransactionsDatesString();
    const last4Weeks = this.dateService.getLast4Weeks(new Date().getDate());
    const numberOfTransactionsLast4Weeks = last4Weeks.map((week) => {
      const weekString = this.dateService.transformDatesToStrings(week);
      const numberOfMatchesPerWeek = weekString.reduce((i, day) => {
        return (i += transactionDatesStrings.filter((transactionDate) => transactionDate === day).length);
      }, 0);
      return numberOfMatchesPerWeek;
    });
    this.barChartData.labels = this.dateService.format4WeeksToDisplay(last4Weeks);
    this.barChartData.datasets[0]['data'] = numberOfTransactionsLast4Weeks;
  }
}

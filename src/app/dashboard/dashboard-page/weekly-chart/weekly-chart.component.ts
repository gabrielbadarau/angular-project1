import { ChangeDetectionStrategy, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DateService } from 'src/app/shared/date.service';
import { Itransactions } from 'src/app/transactions/transactions';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-weekly-chart',
  templateUrl: './weekly-chart.component.html',
  styleUrls: ['./weekly-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklyChartComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() transactions: Itransactions[];

  public barChartOptions: ChartConfiguration['options'] = {
    plugins: {
      title: {
        display: true,
        text: 'Weekly Chart (last 7 days)',
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

  ngOnChanges(): void {
    const transactionDatesString = this.dashboardService.getTransactionsDatesString(this.transactions);
    const last7Dates = this.dateService.getLast7Dates(new Date().getDate());
    const last7DatesString = this.dateService.transformDatesToStrings(last7Dates);
    const numberOfTransactionsLast7Dates = last7DatesString.map((day) => {
      return transactionDatesString.filter((transactionDate) => transactionDate === day).length;
    });
    this.barChartData.labels = this.dateService.format7DatesToDisplay(last7Dates);
    this.barChartData.datasets[0]['data'] = numberOfTransactionsLast7Dates;
    this.chart?.update();
  }
}

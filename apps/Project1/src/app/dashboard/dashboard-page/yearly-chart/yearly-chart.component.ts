import { ChangeDetectionStrategy, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DateService, Itransactions } from '../../../../../../../libs/core-data/src';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-yearly-chart',
  templateUrl: './yearly-chart.component.html',
  styleUrls: ['./yearly-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearlyChartComponent implements OnChanges {
  @Input() transactions: Itransactions[];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartOptions: ChartConfiguration['options'] = {
    plugins: {
      title: {
        display: true,
        text: 'Yearly Chart (last year)',
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
    const lastYearTransactionsString = this.dashboardService.getLastYearTransactionsString(this.transactions);
    const numberOfTransactionsPerMonth: number[] = [];
    const date = new Date();
    date.setMonth(new Date().getMonth() + 1);
    do {
      const numberOfMatches = lastYearTransactionsString.reduce((i, transaction) => {
        if (+transaction.split('.')[0] - 1 === date.getMonth()) {
          i++;
        }
        return i;
      }, 0);
      numberOfTransactionsPerMonth.push(numberOfMatches);
      date.setMonth(date.getMonth() + 1);
    } while (date.getMonth() !== new Date().getMonth() + 1);
    this.barChartData.labels = this.dateService.getLast12MonthsToDisplay();
    this.barChartData.datasets[0]['data'] = numberOfTransactionsPerMonth;
    this.chart?.update();
  }
}

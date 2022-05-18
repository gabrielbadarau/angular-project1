import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DateService } from 'src/app/shared/date.service';
import { Itransactions } from 'src/app/transactions/transactions';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-custom-picker',
  templateUrl: './custom-picker.component.html',
  styleUrls: ['./custom-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPickerComponent implements OnInit {
  @Input() transactions: Itransactions[];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  rangeForm: FormGroup;
  tommorow: Date = new Date();
  startDate: Date;
  endDate: Date;

  public lineChartOptions: ChartConfiguration['options'] = {
    plugins: {
      title: {
        display: true,
        text: 'Custom Chart (per day)',
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
  public lineChartType: ChartType = 'line';

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{ data: [], label: 'No. of transactions', tension: 0.35 }],
  };

  constructor(private dashboardService: DashboardService, private fb: FormBuilder, private dateService: DateService) {}

  ngOnInit(): void {
    this.rangeForm = this.fb.group({
      start: [Date],
      end: [Date],
    });
  }

  onChangeStartDate(event: MatDatepickerInputEvent<Date>): void {
    this.startDate = event.value ? new Date(event.value.getTime()) : null;
    if (this.startDate && this.endDate && this.startDate.getTime() < this.endDate.getTime()) {
      this.makeChart();
    }
  }

  onChangeEndDate(event: MatDatepickerInputEvent<Date>): void {
    this.endDate = event.value ? new Date(event.value.getTime()) : null;
    if (this.startDate && this.endDate && this.startDate.getTime() < this.endDate.getTime()) {
      this.makeChart();
    }
  }

  makeChart(): void {
    const chosenTransactions = this.dashboardService.getFilteredAndSortedTransactions(
      this.startDate,
      this.endDate,
      this.transactions
    );
    const labels: string[] = [];
    const numberOfTransactionsPerDay: number[] = [];
    const counter: Date = this.startDate;
    do {
      labels.push(counter.toDateString().substring(4, 15));
      const numberOfMatches = chosenTransactions.reduce((i, transaction) => {
        if (this.dateService.transformStringToDate(transaction.date).getTime() === counter.getTime()) {
          i++;
        }
        return i;
      }, 0);
      numberOfTransactionsPerDay.push(numberOfMatches);
      counter.setDate(counter.getDate() + 1);
    } while (counter.getTime() <= this.endDate.getTime());
    this.lineChartData.labels = labels;
    this.lineChartData.datasets[0]['data'] = numberOfTransactionsPerDay;
    this.chart?.update();
    this.startDate = null;
    this.endDate = null;
  }
}

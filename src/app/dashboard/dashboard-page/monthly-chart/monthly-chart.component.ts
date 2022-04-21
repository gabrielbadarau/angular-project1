import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Itransactions } from 'src/app/transactions/transactions';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-monthly-chart',
  templateUrl: './monthly-chart.component.html',
  styleUrls: ['./monthly-chart.component.css']
})
export class MonthlyChartComponent implements OnInit {

  @Input() transactions:Itransactions[];
  last4Weeks:Date[][]=[];
  transactionDatesStrings:string[]=[];
  numberOfTransactionsLast4Weeks:number[]=[];


  public barChartOptions: ChartConfiguration['options'] = {
    plugins:{
      title:{
        display:true,
        text:'Monthly Chart (last 4 weeks)'
      }
    },
    responsive: true,
    scales:{
      x:{},
      y:{
        min:0,
        ticks:{
          stepSize:1
        }
      }
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'No. of transactions' }
    ]
  };

  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.last4Weeks=this.dashboardService.getLast4Weeks(new Date().getDate());
    this.transactions.forEach(transaction=>this.transactionDatesStrings.push(transaction.date))

    this.last4Weeks.forEach(week=>{
      let weekString:string[];
      let numberOfMatchesPerWeek:number=0;
      weekString=this.dashboardService.formatDatesToStrings(week);
      weekString.forEach(day=>{
        numberOfMatchesPerWeek+=this.transactionDatesStrings.filter(transactionDate=>transactionDate===day).length;
      })
      this.numberOfTransactionsLast4Weeks.push(numberOfMatchesPerWeek);
    })

    this.barChartData.labels=this.dashboardService.format4WeeksToDisplay(this.last4Weeks);
    this.barChartData.datasets[0]['data']=this.numberOfTransactionsLast4Weeks;
  }

}

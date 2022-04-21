import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Itransactions } from 'src/app/transactions/transactions';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-weekly-chart',
  templateUrl: './weekly-chart.component.html',
  styleUrls: ['./weekly-chart.component.css']
})
export class WeeklyChartComponent implements OnInit {

  @Input() transactions:Itransactions[];
  last7Dates:Date[]=[];
  last7DatesStrings:string[]=[];
  transactionDatesStrings:string[]=[];
  numberOfTransactionsLast7Dates:number[]=[];

  public barChartOptions: ChartConfiguration['options'] = {
    plugins:{
      title:{
        display:true,
        text:'Weekly Chart (last 7 days)'
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
    this.last7Dates=this.dashboardService.getLast7Dates(new Date().getDate());
    this.last7DatesStrings=this.dashboardService.formatDatesToStrings(this.last7Dates);
    this.transactions.forEach(transaction=>this.transactionDatesStrings.push(transaction.date))
    
    this.last7DatesStrings.forEach((day)=>{
      let numberOfMatchesPerDay:number=0;
      numberOfMatchesPerDay=this.transactionDatesStrings.filter((transactionDate)=>transactionDate===day).length;
      this.numberOfTransactionsLast7Dates.push(numberOfMatchesPerDay);
    })
    
    this.barChartData.labels=this.dashboardService.format7DatesToDisplay(this.last7Dates);
    this.barChartData.datasets[0]['data']=this.numberOfTransactionsLast7Dates;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Itransactions } from 'src/app/transactions/transactions';
import { DashboardService } from '../../dashboard.service';


@Component({
  selector: 'app-yearly-chart',
  templateUrl: './yearly-chart.component.html',
  styleUrls: ['./yearly-chart.component.css']
})
export class YearlyChartComponent implements OnInit {

  @Input() transactions:Itransactions[];
  lastYearTransactionsStrings:string[]=[];
  numberOfTransactionsPerMonth:number[]=[];

  public barChartOptions: ChartConfiguration['options'] = {
    plugins:{
      title:{
        display:true,
        text:'Yearly Chart (last year)'
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
      { data: [], label: 'No. of transactions'}
    ]
  };

  constructor(private dashboardService:DashboardService) { }

  ngOnInit(): void {
    
    this.getLastYearsTransactions();

    let date=new Date();
    date.setMonth(new Date().getMonth()+1);
    do{
      let number:number=0;
      this.lastYearTransactionsStrings.forEach(transaction=>{
        if(+transaction.split('.')[0]-1===date.getMonth())
        number++;
      })
      this.numberOfTransactionsPerMonth.push(number);
      date.setMonth(date.getMonth()+1)
    } while(date.getMonth()!==new Date().getMonth()+1)
 
    this.barChartData.labels=this.displayLastMonths();
    this.barChartData.datasets[0]['data']=this.numberOfTransactionsPerMonth;
  }

  getLastYearsTransactions():void{
    this.transactions.forEach(transaction=>{
      let lastYear=new Date().getFullYear()-1;
      let lastMonth=new Date().getMonth()+2;
      let transactionYear=+transaction.date.split('.')[2];
      let transactionMonth=+transaction.date.split('.')[0];

      if(transactionYear===lastYear+1 || (transactionYear===lastYear && +transactionMonth>=lastMonth)){
        this.lastYearTransactionsStrings.push(transaction.date);
      }
    });
  }

  displayLastMonths():string[]{
    let lastMonths:string[]=[];
    let date=new Date();
    for(let i=1;i<=12;i++){
      date.setMonth(new Date().getMonth()+i);
      lastMonths.push(date.toDateString().split(' ')[1]);
    }
    return lastMonths;
  }
}

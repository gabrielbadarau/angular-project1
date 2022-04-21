import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Itransactions } from 'src/app/transactions/transactions';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-custom-picker',
  templateUrl: './custom-picker.component.html',
  styleUrls: ['./custom-picker.component.css']
})
export class CustomPickerComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() transactions:Itransactions[];
  rangeForm:FormGroup;
  tommorow:Date=new Date();
  startDate:Date;
  endDate:Date;

  public lineChartOptions: ChartConfiguration['options'] = {
    plugins:{
      title:{
        display:true,
        text:'Custom Chart (per day)'
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
  public lineChartType: ChartType = 'line';

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { data: [], label: 'No. of transactions',tension:0.35 }
    ]
  };

  constructor(
    private dashboardService:DashboardService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.rangeForm=this.fb.group({
      start:[Date],
      end:[Date]
    })
  }

  onChangeStartDate(event:MatDatepickerInputEvent<Date>):void{
    this.startDate=event.value ? new Date(event.value.getTime()) : null;
    if(this.startDate && this.endDate &&this.startDate.getTime()!==this.endDate.getTime() && this.startDate.getTime()<this.endDate.getTime()){
      this.makeChart();
    }
  }

  onChangeEndDate(event:MatDatepickerInputEvent<Date>):void{
    this.endDate=event.value ? new Date(event.value.getTime()) : null;
    if(this.startDate && this.endDate && this.startDate.getTime()<this.endDate.getTime()){
      this.makeChart();
    }
  }

  makeChart():void{
    let chosenTransactions:Itransactions[];
    chosenTransactions=this.filterAndSorterTransactions();

    let labels:string[]=[];
    let numberOfTransaction:number[]=[];

    const counter:Date=this.startDate;
    do{
      labels.push(counter.toDateString().substring(4,15));
      let match:number=0;
      chosenTransactions.forEach(transaction=>{
        if(this.dashboardService.transformStringToDate(transaction.date).getTime()===counter.getTime()){
          match++;
        }
      })
      numberOfTransaction.push(match);
      counter.setDate(counter.getDate()+1)
    }while(counter.getTime()<=this.endDate.getTime())

    this.lineChartData.labels=labels;
    this.lineChartData.datasets[0]['data']=numberOfTransaction;
    this.chart?.update();
    this.startDate=null;
    this.endDate=null;
  }

  filterAndSorterTransactions():Itransactions[]{
    let filteredTransactions:Itransactions[];
    filteredTransactions=this.transactions.filter(transaction=>{
      return (
        this.dashboardService.transformStringToDate(transaction.date).getTime()>=this.startDate.getTime() &&
        this.dashboardService.transformStringToDate(transaction.date).getTime()<=this.endDate.getTime()
      )
    })
    filteredTransactions.sort((a,b)=>{
      return this.dashboardService.transformStringToDate(a.date).getTime()-this.dashboardService.transformStringToDate(b.date).getTime();
    })
    return filteredTransactions;
  }

}

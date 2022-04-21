import { Injectable } from '@angular/core';
import { HttpWrapperService } from '../http-wrapper.service';
import { Itransactions } from '../transactions/transactions';
import LOCALHOST from '../localhost';

@Injectable()
export class DashboardService {

  constructor( private wrappedHttpService:HttpWrapperService) { }

  getTransactions(){
    const transactionsUrl=LOCALHOST+'/transactions'
    return this.wrappedHttpService.get<Itransactions[]>(transactionsUrl)
  }

  getLast7Dates(date:number):Date[]{
    let last7Dates:Date[]=[];
    for(let i=6;i>=0;i--){
      let today=new Date();
      today.setDate(date)
      today.setDate(today.getDate()-i);
      last7Dates.push(today);
    }
    return last7Dates;
  }

  getLast4Weeks(date:number):Date[][]{
    let last4Weeks:Date[][]=[];
    for(let i=21;i>=0;i-=7){
      last4Weeks?.push(this.getLast7Dates(date-i))
    }
    return last4Weeks;
  }

  format4WeeksToDisplay(weeks:Date[][]):string[]{
    let stringWeeks:string[]=[];
    weeks.forEach((week)=>{
      let stringWeek:string[]=[];
      stringWeek=this.format7DatesToDisplay(week);
      stringWeeks.push(`${stringWeek[0]} - ${stringWeek[6]}`)
    })
    return stringWeeks;
  }

  format7DatesToDisplay(days:Date[]):string[]{
    let stringDays:string[]=[];
    days.forEach((day)=>{
      stringDays.push(day.toString().substring(4,10));
    })
    return stringDays;
  }

  formatDatesToStrings(dates:Date[]):string[]{
    let strings:string[]=[];
    dates.forEach((date)=>{
      let monthDate=date.getMonth()+1<10 ? '0'+(date.getMonth()+1): date.getMonth()+1;
      let dayDate=date.getDate()<10 ? '0'+date.getDate() : date.getDate();
      let yearDate=date.getFullYear()
      strings.push(`${monthDate}.${dayDate}.${yearDate}`)
    })
    return strings;
  }

  transformStringToDate(value:string):Date{
    let transactionDateArray:number[]=[];
      transactionDateArray.push(+value.split('.')[0]-1);
      transactionDateArray.push(+value.split('.')[1]);
      transactionDateArray.push(+value.split('.')[2]);
      return new Date(transactionDateArray[2],transactionDateArray[0],transactionDateArray[1]);
  }

}

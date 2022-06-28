import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getLast7Dates(date: number): Date[] {
    const last7Dates: Date[] = [];
    for (let i = 6; i >= 0; i--) {
      const today = new Date();
      today.setDate(date);
      today.setDate(today.getDate() - i);
      last7Dates.push(today);
    }
    return last7Dates;
  }

  getLast4Weeks(date: number): Date[][] {
    const last4Weeks: Date[][] = [];
    for (let i = 21; i >= 0; i -= 7) {
      last4Weeks.push(this.getLast7Dates(date - i));
    }
    return last4Weeks;
  }

  transformDatesToStrings(dates: Date[]): string[] {
    const strings = dates.map((date) => {
      const monthDate = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      const dayDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      const yearDate = date.getFullYear();
      return `${monthDate}.${dayDate}.${yearDate}`;
    });
    return strings;
  }

  transformStringToDate(value: string): Date {
    const transactionDateArray: number[] = [];
    transactionDateArray.push(+value.split('.')[0] - 1);
    transactionDateArray.push(+value.split('.')[1]);
    transactionDateArray.push(+value.split('.')[2]);
    return new Date(transactionDateArray[2], transactionDateArray[0], transactionDateArray[1]);
  }

  format4WeeksToDisplay(weeks: Date[][]): string[] {
    const stringWeeks = weeks.map((week) => {
      const stringWeek = this.format7DatesToDisplay(week);
      return `${stringWeek[0]} - ${stringWeek[6]}`;
    });
    return stringWeeks;
  }

  format7DatesToDisplay(days: Date[]): string[] {
    const stringDays = days.map((day) => {
      return day.toString().substring(4, 10);
    });
    return stringDays;
  }

  getLast12MonthsToDisplay(): string[] {
    const lastMonths: string[] = [];
    const date = new Date();
    for (let i = 1; i <= 12; i++) {
      date.setMonth(new Date().getMonth() + i);
      lastMonths.push(date.toDateString().split(' ')[1]);
    }
    return lastMonths;
  }
}

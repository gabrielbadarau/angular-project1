import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { NgChartsModule } from 'ng2-charts';
import { WeeklyChartComponent } from './dashboard-page/weekly-chart/weekly-chart.component';
import { DashboardService } from './dashboard.service';
import { MonthlyChartComponent } from './dashboard-page/monthly-chart/monthly-chart.component';
import { YearlyChartComponent } from './dashboard-page/yearly-chart/yearly-chart.component';
import { CustomPickerComponent } from './dashboard-page/custom-picker/custom-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardPageComponent,
    WeeklyChartComponent,
    MonthlyChartComponent,
    YearlyChartComponent,
    CustomPickerComponent,
  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgChartsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [DashboardService],
})
export class DashboardModule {}

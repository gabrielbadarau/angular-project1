import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TransactionsModule } from './transactions/transactions.module';
import { UsersModule } from './users/users.module';

import {TabMenuModule} from 'primeng/tabmenu';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    TabMenuModule,
    MenuModule,
    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path:'**',redirectTo:'',pathMatch:'full'}
    ]),
    UsersModule,
    TransactionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

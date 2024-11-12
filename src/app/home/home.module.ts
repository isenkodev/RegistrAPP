import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { CalendarModule } from '../modules/calendar/calendar.module';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule, 
    CalendarModule,
    FullCalendarModule
  ],
  declarations: [HomePage]
})

export class CalendarComponent{}
export class HomePageModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { DiagnoticViewsComponent } from './diagnotic-views/diagnotic-views.component';
import { GeneralComponent } from './general/general.component';
import { DescriptionComponent } from './description/description.component';
import { PcodesComponent } from './pcodes/pcodes.component';
import { VehicleDataComponent } from './vehicle-data/vehicle-data.component';
import { DriverBehaviourComponent } from './driver-behaviour/driver-behaviour.component';
import { VehicleHealthComponent } from './vehicle-health/vehicle-health.component';
import { CrashReportComponent } from './crash-report/crash-report.component';
import { ChartComponent } from './chart/chart.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    DiagnoticViewsComponent,
    GeneralComponent,
    DescriptionComponent,
    PcodesComponent,
    VehicleDataComponent,
    DriverBehaviourComponent,
    VehicleHealthComponent,
    CrashReportComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

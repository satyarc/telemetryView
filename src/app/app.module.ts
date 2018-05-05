import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule,HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS  } from 'ng-pick-datetime';
import { DiagnosticViewsComponent } from './diagnostic-views/diagnostic-views.component';
import { DriverBehaviourComponent } from './driver-behaviour/driver-behaviour.component';
import { GeneralComponent } from './general/general.component';
import { PCodesComponent } from './p-codes/p-codes.component';
import { VehicleHealthComponent } from './vehicle-health/vehicle-health.component';
import { VehicleDataComponent } from './vehicle-data/vehicle-data.component';
import { DescriptionComponent } from './description/description.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CrashReportComponent } from './crash-report/crash-report.component';

@NgModule({
  declarations: [
    AppComponent,
    DiagnosticViewsComponent,
    DriverBehaviourComponent,
    GeneralComponent,
    PCodesComponent,
    VehicleHealthComponent,
    VehicleDataComponent,
    DescriptionComponent,
    CrashReportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

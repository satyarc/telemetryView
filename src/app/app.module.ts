import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { ContentComponent} from './content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule,HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { DiagnoticViewsComponent } from './diagnotic-views/diagnotic-views.component';
import { MonitoredTestsComponent } from './monitored-tests/monitored-tests.component';
import { GeneralComponent } from './general/general.component';
import { DescriptionComponent } from './description/description.component';
import { PcodesComponent } from './pcodes/pcodes.component';



@NgModule({
  declarations: [
    AppComponent,
    DiagnoticViewsComponent,
    MonitoredTestsComponent,
    GeneralComponent,
    DescriptionComponent,
    PcodesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent
              ]
})
export class AppModule { }

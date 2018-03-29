import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { SideMenusComponent } from './side-menus/side-menus.component';
import { ContentComponent} from './content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { DiagnoticViewsComponent } from './diagnotic-views/diagnotic-views.component';
import { MonitoredTestsComponent } from './monitored-tests/monitored-tests.component';



@NgModule({
  declarations: [
    AppComponent,
    DiagnoticViewsComponent,
    MonitoredTestsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent
              ]
})
export class AppModule { }

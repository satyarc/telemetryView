import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { TopMenusComponent } from './top-menus/top-menus.component';
import { SideMenusComponent } from './side-menus/side-menus.component';
import { ContentComponent } from './content/content.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';



@NgModule({
  declarations: [
    AppComponent,
    TopMenusComponent,
    SideMenusComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    NgbModule.forRoot(),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent,
              SideMenusComponent,
              TopMenusComponent,
              ContentComponent
              ]
})
export class AppModule { }

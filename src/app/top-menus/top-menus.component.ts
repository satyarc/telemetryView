import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-top-menus',
  inputs: ['name:name'],
  templateUrl: './top-menus.component.html',
  styleUrls: ['./top-menus.component.css']
})


export class TopMenusComponent implements OnInit {
    
  views=["Timeseries View","Temperature View","Humidity View"];
  
  constructor(private http:Http) {
      
  }

  ngOnInit() {
  }
  
}

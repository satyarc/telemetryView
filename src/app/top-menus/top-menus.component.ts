import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-top-menus',
  inputs: ['device: device'],
  templateUrl: './top-menus.component.html',
  styleUrls: ['./top-menus.component.css']
})
export class TopMenusComponent implements OnInit {
    
    views=["Timeseries View","Temperature View","Humidity View"];
  constructor() { }

  ngOnInit() {
  }

}

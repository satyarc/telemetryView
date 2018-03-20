import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-side-menus',
  templateUrl: './side-menus.component.html',
  styleUrls: ['./side-menus.component.css']
})
export class SideMenusComponent implements OnInit {

  devices=["RASPBERRY PI DEMO DEVICE","DHT11 DEMO DEVICE"];
  constructor() {
      
  }

  ngOnInit() {
      
  }
}

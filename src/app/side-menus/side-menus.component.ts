import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-side-menus',
  templateUrl: './side-menus.component.html',
  styleUrls: ['./side-menus.component.css']
})
export class SideMenusComponent implements OnInit {

  //devices=["RASPBERRY PI DEMO DEVICE","DHT11 DEMO DEVICE"];
    devices  : Array<any>;
  constructor(private http:Http) {
      this.http.get('http://localhost:3000/devices')
      .map(response => response.json())
      .subscribe(res => this.devices = res);
  }

  ngOnInit() {
      
  }
  
  selectedDevice :Object;
  deviceSelected(id){
      
      this.http.get('http://localhost:3000/device'+id)
      .map(response => response.json())
      .subscribe(res => this.selectedDevice = res);
      alert(this.selectedDevice);
  }
}

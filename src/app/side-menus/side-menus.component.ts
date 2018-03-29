import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import {ContentComponent} from '../content/content.component';

@Component({
  selector: 'app-side-menus',
  templateUrl: './side-menus.component.html',
  styleUrls: ['./side-menus.component.css']
})
export class SideMenusComponent implements OnInit {

  //devices=["RASPBERRY PI DEMO DEVICE","DHT11 DEMO DEVICE"];
    troubleCodes  : Array<any>;
  constructor(private http:Http) {
      this.http.get('http://169.44.138.58:3011/devices')
      .map(response => response.json())
      .subscribe(res => this.troubleCodes = res);
  }

  ngOnInit() {
      
  }
  
  
  selectedCode : any;
  
  
  showtroubleDetails(event){
     
      console.log(event.path[0].innerText);
      this.selectedCode = event.path[0].innerText;
      
      
  }
  
  selectedDevice :Object;
  deviceSelected(id){
      
      this.http.get('http://localhost:3011/device'+id)
      .map(response => response.json())
      .subscribe(res => this.selectedDevice = res);
  }
}

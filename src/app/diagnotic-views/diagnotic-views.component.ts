import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-diagnotic-views',
  templateUrl: './diagnotic-views.component.html',
  styleUrls: ['./diagnotic-views.component.css']
})
export class DiagnoticViewsComponent implements OnInit {

    devicedetails  : any;
    constructor(private http:Http) {
        this.http.get('http://localhost:3011/device')
        .map(response => response.json())
        .subscribe(res => this.devicedetails = res);
    }

      ngOnInit() {
      }
    
      selectedCode : any;
      selectedTroubleObject : any;
      
          
      showtroubleDetails(event){

          console.log(event.path[0].innerText);
          this.selectedCode = event.path[0].innerText;
          
          for (let trouble of this.devicedetails.troubleCodes){
              if(trouble.code === this.selectedCode){
                  this.selectedTroubleObject = trouble;
                  break;
              }
          }
      }
}

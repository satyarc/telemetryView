import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnostic-views',
  inputs: ['pageInfoList:pageInfoList'],
  templateUrl: './diagnostic-views.component.html',
  styleUrls: ['./diagnostic-views.component.css']
})

export class DiagnosticViewsComponent implements OnInit {

    authToken : any;
    interval :any;

    constructor() {
        
    }
    
  ngOnInit() {
      
  }
}

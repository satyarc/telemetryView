import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagnotic-views',
  inputs: ['generalInfo:generalInfo','min:min','vehicleHealth:vehicleHealth','pCodes:pCodes'],
  templateUrl: './diagnotic-views.component.html',
  styleUrls: ['./diagnotic-views.component.css']
})


export class DiagnoticViewsComponent implements OnInit {
    
    ngOnInit() {        
    }

    constructor() {
        
    }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emission-data-report',
  templateUrl: './emission-data-report.component.html',
  inputs: ['chartData:chartData','timeLine:timeLine'],
  styleUrls: ['./emission-data-report.component.css']
})
export class EmissionDataReportComponent implements OnInit {


  constructor() {

  }

  ngOnInit() {
  }
  

   public lineChartOptions:any = {
     responsive: true
   };

   public lineChartLegend:boolean = true;
   public lineChartType:string = 'line';

   // events
   public chartClicked(e:any):void {
     console.log(e);
   }

   public chartHovered(e:any):void {
     console.log(e);
   }
}

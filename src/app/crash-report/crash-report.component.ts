import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crash-report',
  inputs: ['chartData:chartData','timeLine:timeLine'],
  templateUrl: './crash-report.component.html',
  styleUrls: ['./crash-report.component.css']
})
export class CrashReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {  }
    

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

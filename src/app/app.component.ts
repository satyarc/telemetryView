import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Telemetry View';
  
  constructor() {
      this.btnView1 = 'btn-clicked';
      this.btnVehicleData = 'btn-default';
      this.btnPerformanceBehaviour = 'btn-default';
      this.btnVehicleHealth = 'btn-default';
      this.btnCrashReport = 'btn-default';
  }
  
  ngOnInit() {
      
  }
  
  selectedView :any;
  view1 = true;
  viewVehicleData = false;
  viewPerformanceBehaviour = false;
  viewVehicleHealth = false;
  viewCrashReport = false;
  
  btnView1: string;
  btnVehicleData: string;
  btnPerformanceBehaviour: string;
  btnVehicleHealth: string;
  btnCrashReport: string;
  
  clickedFlag : any;
  showView1(event){
      this.btnView1 = 'btn-clicked';
      this.btnVehicleData = 'btn-default';
      this.btnPerformanceBehaviour = 'btn-default';
      this.btnVehicleHealth = 'btn-default';
      this.btnCrashReport = 'btn-default';
      this.view1 = true;
      this.viewVehicleData = false;
      this.viewPerformanceBehaviour = false;
      this.viewVehicleHealth = false;
      this.viewCrashReport = false;
  }
  
  showViewVehicleData(event){
      this.btnView1 = 'btn-default';
      this.btnVehicleData = 'btn-clicked';
      this.btnPerformanceBehaviour = 'btn-default';
      this.btnVehicleHealth = 'btn-default';
      this.btnCrashReport = 'btn-default';
      this.view1 = false;
      this.viewVehicleData = true;
      this.viewPerformanceBehaviour = false;
      this.viewVehicleHealth = false;
      this.viewCrashReport = false;
  }
  
  showPerformanceBehaviour(event){
      this.btnView1 = 'btn-default';
      this.btnVehicleData = 'btn-default';
      this.btnPerformanceBehaviour = 'btn-clicked';
      this.btnVehicleHealth = 'btn-default';
      this.btnCrashReport = 'btn-default';
      this.view1 = false;
      this.viewVehicleData = false;
      this.viewPerformanceBehaviour = true;
      this.viewVehicleHealth = false;
      this.viewCrashReport = false;
  }
  
  showVehicleHealth(event){
      this.btnView1 = 'btn-default';
      this.btnVehicleData = 'btn-default';
      this.btnPerformanceBehaviour = 'btn-default';
      this.btnVehicleHealth = 'btn-clicked';
      this.btnCrashReport = 'btn-default';
      this.view1 = false;
      this.viewVehicleData = false;
      this.viewPerformanceBehaviour = false;
      this.viewVehicleHealth = true;
      this.viewCrashReport = false;
  }
  
  showCrashReport(event){
      this.btnView1 = 'btn-default';
      this.btnVehicleData = 'btn-default';
      this.btnPerformanceBehaviour = 'btn-default';
      this.btnVehicleHealth = 'btn-default';
      this.btnCrashReport = 'btn-clicked';
      this.view1 = false;
      this.viewVehicleData = false;
      this.viewPerformanceBehaviour = false;
      this.viewVehicleHealth = false;
      this.viewCrashReport = true;
  }
}

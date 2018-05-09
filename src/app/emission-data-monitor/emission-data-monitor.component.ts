import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { ChartSelectEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-emission-data-monitor',
  templateUrl: './emission-data-monitor.component.html',
  styleUrls: ['./emission-data-monitor.component.css']
})
export class EmissionDataMonitorComponent implements OnInit {

  tableData = [];
 
  pn_chartDataItems = [];
  pm_chartDataItems = [];
  nox02_chartDataItems = [];
  nox_chartDataItems = [];
  uegoafr_chartDataItems = [];
  uego02_chartDataItems = [];
  ect_chartDataItems = [];
  engrpm_chartDataItems = [];
  vehspeed_chartDataItems = [];
  
  table = true;
  allCharts = false;
  pn_chart = false;
  pm_chart = false;
  nox02_chart = false;
  nox_chart = false;
  uegoafr_chart = false;
  uego02_chart = false;
  ect_chart = false;
  engrpm_chart = false;
  vehspeed_chart = false;
  
  selection = 'View Chart';
    
  constructor(private http:HttpClient) {
      this.populateData('08022018_0652_NGK.csv','08022018_0703_OBDII.csv');
  }
  
  toggleTableChart(event){
      this.table = !this.table;
      this.allCharts = !this.allCharts;
      if(this.table){
          this.selection = 'View Chart';
      }else{
          this.selection = 'View Table';
      }
  }
   

  pn_chartData =  {
          chartType: 'LineChart',
          dataTable: this.pn_chartDataItems,
          options: {'title': 'PN',
                      width: 150,
                      height: 150}
        };
  
  pm_chartData =  {
          chartType: 'LineChart',
          dataTable: this.pm_chartDataItems,
          options: {'title': 'PM',
                      width: 150,
                      height: 150}
        };
  
  nox02_chartData =  {
          chartType: 'LineChart',
          dataTable: this.nox02_chartDataItems,
          options: {'title': 'NOX02',
                      width: 150,
                      height: 150}
        };
  
  nox_chartData =  {
          chartType: 'LineChart',
          dataTable: this.nox_chartDataItems,
          options: {'title': 'NOX',
                      width: 150,
                      height: 150}
        };
  
  uegoafr_chartData =  {
          chartType: 'LineChart',
          dataTable: this.uegoafr_chartDataItems,
          options: {'title': 'UEGOAFR',
                      width: 150,
                      height: 150}
        };
  
  uego02_chartData =  {
          chartType: 'LineChart',
          dataTable: this.uego02_chartDataItems,
          options: {'title': 'UEGO02',
                      width: 150,
                      height: 150}
        };
  
  ect_chartData =  {
          chartType: 'LineChart',
          dataTable: this.ect_chartDataItems,
          options: {'title': 'ECT',
                      width: 150,
                      height: 150}
        };
  
  engrpm_chartData =  {
          chartType: 'LineChart',
          dataTable: this.engrpm_chartDataItems,
          options: {'title': 'ENG RPM',
                      width: 150,
                      height: 150}
        };
  
  vehspeed_chartData =  {
          chartType: 'LineChart',
          dataTable: this.vehspeed_chartDataItems,
          options: {'title': 'VEH SPEED',
                      width: 150,
                      height: 150}
        };
  
  
  
  pn_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.pn_chartDataItems,
          options: {'title': 'PN',
                      width: 750,
                      height: 450}
        };
  
  pm_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.pm_chartDataItems,
          options: {'title': 'PM',
                      width: 750,
                      height: 450}
        };
  
  nox02_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.nox02_chartDataItems,
          options: {'title': 'NOX02',
                      width: 750,
                      height: 450}
        };
  
  nox_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.nox_chartDataItems,
          options: {'title': 'NOX',
                      width: 750,
                      height: 450}
        };
  
  uegoafr_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.uegoafr_chartDataItems,
          options: {'title': 'UEGOAFR',
                      width: 750,
                      height: 450}
        };
  
  uego02_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.uego02_chartDataItems,
          options: {'title': 'UEGO02',
                      width: 750,
                      height: 450}
        };
  
  ect_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.ect_chartDataItems,
          options: {'title': 'ECT',
                      width: 750,
                      height: 450}
        };
  
  engrpm_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.engrpm_chartDataItems,
          options: {'title': 'ENG RPM',
                      width: 750,
                      height: 450}
        };
  
  vehspeed_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.vehspeed_chartDataItems,
          options: {'title': 'VEH SPEED',
                      width: 750,
                      height: 450}
        };
    
  ngOnInit() {
      
  }
  
  fileName1:String;
  fileName2:String;
  
  changeFile1(event:any) {
      this.fileName1 = event.target.files[0].name;
  }
  
  changeFile2(event:any) {
      this.fileName2 = event.target.files[0].name;
  }
  
  loadData(event:any){
      this.populateData(this.fileName1,this.fileName2);
  }

  populateData(fileName1:String, fileName2:String){
      
      let pn = 0;
      let pm = 0;
      let nox02 = 0;
      let nox = 0;
      let uegoafr = 0;
      let uego02 = 0;
      let ect =0;
      let engrpm = 0;
      let vehspeed = 0;
      
      this.http.get('assets/'+ fileName1, {responseType: 'text'})
      .subscribe(
          data => {
              let allTextLines = data.split(/\r|\n|\r/);  
              
              let t0_0600 = '';
              let t0_0602 = '';
              let t0_0603 = '';
                           
              let chart_pn_columns = ['T','pn'];
              let chart_pm_columns = ['T','pm'];
              let chart_nox02_columns = ['T','nox02'];
              let chart_nox_columns = ['T','nox'];
              let chart_uegoafr_columns = ['T','uegoafr'];
              let chart_uego02_columns = ['T','uego02'];
                                  
              allTextLines.forEach(line =>{
                  let dataItem = line.split(',');
                  
                  let dataPoints_pn = [];
                  let dataPoints_pm = [];
                  let dataPoints_nox02 = [];
                  let dataPoints_nox = [];
                  let dataPoints_uegoafr = [];
                  let dataPoints_uego02 = [];
                  

                  if(dataItem != null){
                      let dterm = (dataItem[2])? dataItem[2].split(':'):'';
                      let d = (dterm && dterm[1].length > 0) ? dterm[1].split(" ").join(""):"";
                      dataItem[2] = d;
                      
                      let hterm = (dataItem[1])? dataItem[1].split(':'):'';
                      let h = (hterm && hterm[1].length > 0) ? hterm[1].split(" ").join(""):"";
                      dataItem[1] = h;
                      
                      let tterm = (dataItem[0])? dataItem[0].split(':'):'';
                      let t = (tterm && tterm[1].length > 0) ? tterm[1].split(" ").join(""):"";
                      dataItem[0] = t;
                                          
                      let cterm = (dataItem[3])? dataItem[3].split(':'):'';
                      let c = (cterm && cterm[1].length > 0) ? cterm[1].split(" ").join(""):"";
                      dataItem[3] = c;
                      
                      if(d.length > 0){
                          let numD = parseInt("0x" + d);
                          console.log(numD);
                          if(h === "0600"){  
                               pn = ((numD & 0x00000000000000ffffffffff00000000) * 125) - 4000000;
                               pm = (numD & 0x000000000000000000000000ffffffff) * 0.001;
                               
                               if(t0_0600.length == 0){
                                   t0_0600 = t;
                               }
                               
                               this.pn_chartDataItems.push(chart_pn_columns);
                               this.pm_chartDataItems.push(chart_pm_columns);
                               
                               if(t.length > 0){
                                   let correctedTime = (parseInt(t) - parseInt(t0_0600)) * 0.01;
                                   dataPoints_pn.push(correctedTime);
                                   dataPoints_pm.push(correctedTime);
                               }
                               
                               dataPoints_pn.push(pn);
                               dataPoints_pm.push(pm);
                               
                               this.pn_chartDataItems.push(dataPoints_pn);
                               this.pm_chartDataItems.push(dataPoints_pm);
                               
                          }
                          if(h === "0602"){
                               nox02 = ((numD & 0x0000000000000000ffffffff00000000) * 0.001) - 40.96;
                               nox = ((numD & 0x000000000000000000000000ffffff00) * 0.5) - 256;
                               
                               if(t0_0602.length == 0){
                                   t0_0602 = t;
                               }
                               
                               this.nox02_chartDataItems.push(chart_nox02_columns);
                               this.nox_chartDataItems.push(chart_nox_columns);
                               
                               if(t.length > 0){
                                   let correctedTime = (parseInt(t) - parseInt(t0_0602)) * 0.01;
                                   dataPoints_nox02.push(correctedTime);
                                   dataPoints_nox.push(correctedTime);
                               }
                               
                               dataPoints_nox02.push(nox02);
                               dataPoints_nox.push(nox);
                               
                               this.nox02_chartDataItems.push(dataPoints_nox02);
                               this.nox_chartDataItems.push(dataPoints_nox);
                          }
                          if(h === "0603"){
                               uegoafr = (numD & 0x0000000000000000ffffff0000000000) * 0.01;
                               uego02 = ((numD & 0x000000000000000000000000ffffffff)*0.01) - 40.96;
                               
                               if(t0_0603.length == 0){
                                   t0_0603 = t;
                               }
                               
                               this.uegoafr_chartDataItems.push(chart_uegoafr_columns);
                               this.uego02_chartDataItems.push(chart_uego02_columns);
                               
                               if(t.length > 0){
                                   let correctedTime = (parseInt(t) - parseInt(t0_0603)) * 0.01;
                                   dataPoints_uegoafr.push(correctedTime);
                                   dataPoints_uego02.push(correctedTime);
                               }
                               
                               dataPoints_uegoafr.push(uegoafr);
                               dataPoints_uego02.push(uego02);
                               
                               this.uegoafr_chartDataItems.push(dataPoints_uegoafr);
                               this.uego02_chartDataItems.push(dataPoints_uego02);
                          }
  
                          dataItem.push((pn)?pn.toString():'NA');
                          dataItem.push((pm)?pm.toString():'NA');
                          dataItem.push((nox02)?nox02.toString():'NA');
                          dataItem.push((nox)?nox.toString():'NA');
                          dataItem.push((uegoafr)?uegoafr.toString():'NA');
                          dataItem.push((uego02)?uego02.toString():'NA');
                          dataItem.push((ect)?ect.toString():'NA');
                          dataItem.push((engrpm)?engrpm.toString():'NA');
                          dataItem.push((vehspeed)?vehspeed.toString():'NA');

                          this.tableData.push(dataItem);
                          
                      }// end if d.length >0
                  }// end if dataItem != null
              });
          },
          error => {
              console.log(error);
          }
      ); // file 1
      
      this.http.get('assets/'+ fileName2, {responseType: 'text'})
      .subscribe(
          data => {
              let allTextLines = data.split(/\r|\n|\r/);  
              
              let t0_ect = '';
              let t0_eng_rpm = '';
              let t0_veh_speed = '';
                           
              let chart_ect_columns = ['T','ect'];
              let chart_eng_rpm_columns = ['T','eng_rpm'];
              let chart_veh_speed_columns = ['T','veh_speed'];
                                  
              allTextLines.forEach(line =>{
                  let dataItem = line.split(',');
                  
                  let dataPoints_ect = [];
                  let dataPoints_eng_rpm = [];
                  let dataPoints_veh_speed = [];
               
                  if(dataItem != null){
                      let dterm = (dataItem[2])? dataItem[2].split(':'):'';
                      let d = (dterm && dterm[1].length > 0) ? dterm[1].split(" ").join(""):"";
                      dataItem[2] = d;
                      
                      let hterm = (dataItem[1])? dataItem[1].split(':'):'';
                      let h = (hterm && hterm[1].length > 0) ? hterm[1].split(" ").join(""):"";
                      dataItem[1] = h;
                      
                      let tterm = (dataItem[0])? dataItem[0].substring(1, 14).split(':'):'';
                      let t = (tterm && tterm[1].length > 0) ? tterm[1].split(" ").join(""):"";
                      dataItem[0] = t;
                                          
                      let cterm = (dataItem[3])? dataItem[3].split(':'):'';
                      let c = (cterm && cterm[1].length > 0) ? cterm[1].split(" ").join(""):"";
                      dataItem[3] = c;
                      
                      if(d.length > 0){
                          let numD = parseInt("0x" + d);
                          console.log(numD);
                          
                          let header = d[4] + d[5];
                          console.log('header' + header);
                          
                          if(header === "05"){  
                               ect = numD & 0x000000000000ffff0000000000000000;
                           
                               if(t0_ect.length == 0){
                                   t0_ect = t;
                               }
                               
                               this.ect_chartDataItems.push(chart_ect_columns);
                               
                               if(t.length > 0){
                                   let correctedTime = (parseInt(t) - parseInt(t0_ect)) * 0.01;
                                   dataPoints_ect.push(correctedTime);
                               }
                               
                               dataPoints_ect.push(ect);
                               this.ect_chartDataItems.push(dataPoints_ect);
                               console.log(this.ect_chartDataItems);
                          }
                          if(header === "0c"){
                              engrpm = numD & 0x000000000000ffff0000000000000000;
                              
                              if(t0_eng_rpm.length == 0){
                                  t0_eng_rpm = t;
                              }
                              
                              this.engrpm_chartDataItems.push(chart_eng_rpm_columns);
                              
                              if(t.length > 0){
                                  let correctedTime = (parseInt(t) - parseInt(t0_eng_rpm)) * 0.01;
                                  dataPoints_eng_rpm.push(correctedTime);
                              }
                              
                              dataPoints_eng_rpm.push(engrpm);
                              this.engrpm_chartDataItems.push(dataPoints_eng_rpm);
                              console.log(this.engrpm_chartDataItems);
                          }
                          if(header === "0d"){
                              vehspeed = numD & 0x000000000000ffffffff000000000000;
                              
                              if(t0_veh_speed.length == 0){
                                  t0_veh_speed = t;
                              }
                              
                              this.vehspeed_chartDataItems.push(chart_veh_speed_columns);
                              
                              if(t.length > 0){
                                  let correctedTime = (parseInt(t) - parseInt(t0_veh_speed)) * 0.01;
                                  dataPoints_veh_speed.push(correctedTime);
                              }
                              
                              dataPoints_veh_speed.push(vehspeed);
                              this.vehspeed_chartDataItems.push(dataPoints_veh_speed);
                              console.log(this.vehspeed_chartDataItems);
                          }
  
                          dataItem.push((pn)?pn.toString():'NA');
                          dataItem.push((pm)?pm.toString():'NA');
                          dataItem.push((nox02)?nox02.toString():'NA');
                          dataItem.push((nox)?nox.toString():'NA');
                          dataItem.push((uegoafr)?uegoafr.toString():'NA');
                          dataItem.push((uego02)?uego02.toString():'NA');
                          dataItem.push((ect)?ect.toString():'NA');
                          dataItem.push((engrpm)?engrpm.toString():'NA');
                          dataItem.push((vehspeed)?vehspeed.toString():'NA');

                          this.tableData.push(dataItem);
                          
                      }// end if d.length >0
                  }// end if dataItem != null
              });
          },
          error => {
              console.log(error);
          }
      ); // file 2
      
  }
  
  public select_pn(event) {
      this.pn_chart = true;
      this.pm_chart = false;
      this.nox02_chart = false;
      this.nox_chart = false;
      this.uegoafr_chart = false;
      this.uego02_chart = false;
      this.ect_chart = false;
      this.engrpm_chart = false;
      this.vehspeed_chart = false;
  }
  
  public select_pm(event) {
      this.pm_chart = true;
      this.pn_chart = false;
      this.nox02_chart = false;
      this.nox_chart = false;
      this.uegoafr_chart = false;
      this.uego02_chart = false;
      this.ect_chart = false;
      this.engrpm_chart = false;
      this.vehspeed_chart = false;
  }
  
  public select_nox02(event) {    
      this.pm_chart = false;
      this.pn_chart = false;
      this.nox02_chart = true;
      this.nox_chart = false;
      this.uegoafr_chart = false;
      this.uego02_chart = false;
      this.ect_chart = false;
      this.engrpm_chart = false;
      this.vehspeed_chart = false;
  }
  
  public select_nox(event) {
      this.pm_chart = false;
      this.pn_chart = false;
      this.nox02_chart = false;
      this.nox_chart = true;
      this.uegoafr_chart = false;
      this.uego02_chart = false;
      this.ect_chart = false;
      this.engrpm_chart = false;
      this.vehspeed_chart = false;
  }
  
  public select_uegoafr(event) {
      this.pm_chart = false;  
      this.pn_chart = false;
      this.nox02_chart = false;
      this.nox_chart = false;
      this.uegoafr_chart = true;
      this.uego02_chart = false;
      this.ect_chart = false;
      this.engrpm_chart = false;
      this.vehspeed_chart = false;
  }
  
  public select_uego02(event) {
      this.pm_chart = false;    
      this.pn_chart = false;
      this.nox02_chart = false;
      this.nox_chart = false;
      this.uegoafr_chart = false;
      this.uego02_chart = true;
      this.ect_chart = false;
      this.engrpm_chart = false;
      this.vehspeed_chart = false;
  }
  
  public select_ect(event) {
      this.pm_chart = false;    
      this.pn_chart = false;
      this.nox02_chart = false;
      this.nox_chart = false;
      this.uegoafr_chart = false;
      this.uego02_chart = false;
      this.ect_chart = true;
      this.engrpm_chart = false;
      this.vehspeed_chart = false;
  }
  
  public select_engrpm(event) {
      this.pm_chart = false;    
      this.pn_chart = false;
      this.nox02_chart = false;
      this.nox_chart = false;
      this.uegoafr_chart = false;
      this.uego02_chart = false;
      this.ect_chart = false;
      this.engrpm_chart = true;
      this.vehspeed_chart = false;
  }

  public select_vehspeed(event) {
      this.pm_chart = false;    
      this.pn_chart = false;
      this.nox02_chart = false;
      this.nox_chart = false;
      this.uegoafr_chart = false;
      this.uego02_chart = false;
      this.ect_chart = false;
      this.engrpm_chart = false;
      this.vehspeed_chart = true;
  }
  
  
  public hide(event) {
      this.pm_chart = false;    
      this.pn_chart = false;
      this.nox02_chart = false;
      this.nox_chart = false;
      this.uegoafr_chart = false;
      this.uego02_chart = false;
      this.ect_chart = false;
      this.engrpm_chart = false;
      this.vehspeed_chart = false;
  }
}

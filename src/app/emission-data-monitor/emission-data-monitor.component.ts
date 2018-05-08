import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-emission-data-monitor',
  templateUrl: './emission-data-monitor.component.html',
  styleUrls: ['./emission-data-monitor.component.css']
})
export class EmissionDataMonitorComponent implements OnInit {

  emissionDataItems = [];
  chartDataItems = [];
  
  dataPoints_pn = [];
  dataPoints_pm = [];
  dataPoints_nox02 = [];
  dataPoints_nox = [];
  dataPoints_uegoafr = [];
  dataPoints_uego02 = [];
  
  timeLine = [];
  
  table = true;
  chart = false;
  
  selection = 'View Chart';
    
  constructor(private http:HttpClient) {
      this.populateData('08022018_0652_NGK.csv');
      console.log(this.chartDataItems);
  }
  
  toggleTableChart(event){
      this.table = !this.table;
      this.chart = !this.chart;
      if(this.table){
          this.selection = 'View Chart';
      }else{
          this.selection = 'View Table';
      }
  }
  
  /*
  chartData = [{data:this.dataPoints_pn, label:"PN"},
               {data:this.dataPoints_pm, label:"PM"},
               {data:this.dataPoints_nox02, label:"NOX02"},
               {data:this.dataPoints_nox, label:"NOX"},
               {data:this.dataPoints_uegoafr, label:"UEGOAFR"},
               {data:this.dataPoints_uego02, label:"UEGO02"},
              ];*/
  
  chartData =  {
          chartType: 'LineChart',
          dataTable: this.chartDataItems,
          options: {'title': 'Emission Data',
                      width: 900,
                      height: 600}
        };
  
  ngOnInit() {
      
  }
  
  change(event:any) {
      let filename = event.target.files[0].name;
      this.populateData(filename);
  }

  populateData(fileName:string){
      this.http.get('assets/'+ fileName, {responseType: 'text'})
      .subscribe(
          data => {
              console.log(data);
              let lines = [];
              let allTextLines = data.split(/\r|\n|\r/);  
              
              let t0 = parseInt(allTextLines[0].split(',')[0].split(':')[1]);
              
              let chartColumnItem = ['T','pn','pm','nox02','nox','uegoafr','uego02'];
              this.chartDataItems.push(chartColumnItem);
              
              allTextLines.forEach(line =>{
                  let dataItem = line.split(',');
                  let chartDataItem = [];

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
                      
                      if(t.length > 0){
                          let correctedTime = (parseInt(t) - t0) * 0.01;
                          this.timeLine.push(correctedTime);
                          chartDataItem.push(correctedTime);
                      }
                      
                      console.log(this.timeLine);
                      
                      let cterm = (dataItem[3])? dataItem[3].split(':'):'';
                      let c = (cterm && cterm[1].length > 0) ? cterm[1].split(" ").join(""):"";
                      dataItem[3] = c;
                      
                      console.log(d);
                      console.log(h);
                      
                      let pn = 0;
                      let pm = 0;
                      let nox02 = 0;
                      let nox = 0;
                      let uegoafr = 0;
                      let uego02 = 0;
                      
                      if(d.length > 0){
                          let numD = parseInt("0x" + d);
                          console.log(numD);
                          if(h === "0600"){  
                               pn = ((numD & 0x00000000000000ffffffffff00000000) * 125) - 4000000;
                               this.dataPoints_pn.push(pn);
                               pm = (numD & 0x000000000000000000000000ffffffff) * 0.001;
                               this.dataPoints_pm.push(pm);
                          }
                          if(h === "0602"){
                               nox02 = ((numD & 0x0000000000000000ffffffff00000000) * 0.001) - 40.96;
                               this.dataPoints_nox02.push(nox02);
                               nox = ((numD & 0x000000000000000000000000ffffff00) * 0.5) - 256;
                               this.dataPoints_nox.push(nox);
                          }
                          if(h === "0603"){
                               uegoafr = (numD & 0x0000000000000000ffffff0000000000) * 0.01;
                               this.dataPoints_uegoafr.push(uegoafr);
                               uego02 = ((numD & 0x000000000000000000000000ffffffff)*0.01) - 40.96;
                               this.dataPoints_uego02.push(uego02);
                          }
                      
                          dataItem.push("pn:"+ (pn)?pn.toString():"0");
                          dataItem.push("pm:"+ (pm)?pm.toString():"0");
                          dataItem.push("nox02:"+ (nox02)?nox02.toString():"0");
                          dataItem.push("nox:"+ (nox)?nox.toString():"0");
                          dataItem.push("uegoafr:"+ (uegoafr)?uegoafr.toString():"0");
                          dataItem.push("uego02:"+ (uego02)?uego02.toString():"0");
                          
                          chartDataItem.push((pn)?pn:0);
                          chartDataItem.push((pm)?pm:0);
                          chartDataItem.push((nox02)?nox02:0);
                          chartDataItem.push((nox)?nox:0);
                          chartDataItem.push((uegoafr)?uegoafr:0);
                          chartDataItem.push((uego02)?uego02:0);
                          
                          this.emissionDataItems.push(dataItem);
                          this.chartDataItems.push(chartDataItem);
                      }
                  }
              });
          },
          error => {
              console.log(error);
          }
      );
      
  }
}

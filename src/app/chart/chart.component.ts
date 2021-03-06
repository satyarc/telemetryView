import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
    options: Object;
    chart :Chart;
    public now: Date = new Date();
    date = new Date();
  authToken : any;
  urlbase = "https://cors-anywhere.herokuapp.com/"+"http://119.81.217.94:8080/api/plugins/telemetry/DEVICE/544004b0-c850-11e7-89af-f34162121867/values/timeseries?keys=";
  parameter_start_time = "Curr_Time";
  parameters = "Veh_Pos_Long";
  thingsboardDeviceData : any;
  deviceInfo_chart = [];
  deviceInf1_chart1 = [];
  deviceInfo1_chart = [];
  deviceInf_chart1 = [];
  current;
  startpoint;
  endpoint;
  series1;
  time1;
  previous1 = 0;
  min=[];
  datavalue;
  datavaluets;
  scantime=20000;
  deviceInf_chart = [];
  x:any;
index  = 500;
    y:any;
  interval :any;
  constructor(private http:HttpClient) {
      let token : any;
      this.http.post('http://119.81.217.94:8080/api/auth/login', {'username':'tenant@thingsboard.org','password':'tenant'})
      .subscribe(res => {
          token = res;
          this.authToken =  'Bearer ' + token.token; 
          console.log(this.authToken);
          this.refreshData_chart();
          this.graph();
         this.interval = setInterval(() => { 
           this.refreshData1_chart();
              
        }, 20000);     
           
      });
      
  }
  //Code for fetching time form ts for giving start point and end point for fetching the data.
  refreshData_chart() {
      this.deviceInfo_chart = [];
      this.deviceInf_chart = [];
      let url = this.urlbase + this.parameter_start_time;
      this.http.get(url,{headers:{'Content-Type':'application/json','X-Authorization': this.authToken}})
      .subscribe(res => {
          this.thingsboardDeviceData = res;
              console.log(this.thingsboardDeviceData);
              let tbDataKeys = Object.keys(this.thingsboardDeviceData);
              //Fetching ts values.
              tbDataKeys.forEach(key => {
                  console.log(key);
                  let value = this.thingsboardDeviceData[key];
                  value.forEach(val =>{
                      console.log(val.value);
                     this.deviceInf_chart.push({"key":key,"value":val.ts});
                                        });
                      this.deviceInf_chart=this.deviceInf_chart;   

                                     });    
                      this.current = this.deviceInf_chart[0].value;
                       //Storing start and end points initially for first itteration                      
                       this.endpoint = this.current;
                      this.startpoint = this.endpoint - this.scantime;
                      console.log("after");
                      console.log(this.endpoint,this.startpoint);
                      
                                         
              },
          err => {
              console.log("Error occured." + err)
              for(var errItem in err){
                  console.log(errItem)
                  console.log(err[errItem])
              }
          });
         
      }
      refreshData1_chart() {
              //API code to fetch data using start point and end point with interval and limit.
              this.time1 = "&startTs=" + this.startpoint + "&endTs=" + this.endpoint + "&interval=0&limit=1&agg=NONE";
              this.deviceInfo_chart = [];
              this.deviceInf_chart = [];
              let url = this.urlbase + this.parameters + this.time1;
              this.http.get(url,{headers:{'Content-Type':'application/json','X-Authorization': this.authToken}})
              .subscribe(res => {
                this.thingsboardDeviceData = res;
                    console.log(this.thingsboardDeviceData);
                    let tbDataKeys = Object.keys(this.thingsboardDeviceData);
                    //Fetching values to display for different parameters.
                    tbDataKeys.forEach(key => {
                        console.log(key);
                        let value = this.thingsboardDeviceData[key];
                        value.forEach(val =>{
                            console.log(val.value);
                            this.deviceInfo_chart.push({"key":key,"value":val.value});
                                              });
                        this.deviceInfo1_chart=this.deviceInfo_chart;
                        value.forEach(val =>{
                            console.log(val.value);
                           this.deviceInf1_chart1.push({"key":key,"value":val.ts});
                                              });
                            this.deviceInf_chart1=this.deviceInf1_chart1;   
         
                            this.datavaluets = this.deviceInf_chart1[0].value;
                                           });
                      this.datavalue = this.deviceInfo1_chart[0].value;
                             //Re assigning start and end points for next data fetch.
                            this.endpoint = this.startpoint;
                            this.startpoint = this.endpoint - this.scantime;
                          // this.endpoint += this.scantime;
                          console.log("after1");
                            console.log(this.endpoint,this.startpoint);     
                            },
                           
                  err => {
                      console.log("Error occured." + err)
                      for(var errItem in err){
                          console.log(errItem)
                          console.log(err[errItem])
                      }
                           });

     //var x = (new Date()).getTime();
     var x= Number(this.datavaluets);
     console.log("X value:");
     console.log(x);
     var y= Number(this.datavalue);
     console.log("ECTsdklfdsfdsjfsk");
     console.log(y);
     console.log(this.datavalue);
     this.chart.addPoint([x,y]);    
     }
graph(){
    
    this.chart = new Chart({
        chart: {
           
            type: 'line',
            events: {  
            load: function () {
                // set up the updating of the chart each second
                //var series = this.series[0];
                this.series1 = this.series[0];
                var x = (new Date()).getTime();
                var index  = 10000,y1;
                //y1=50;
                
                //this.series1.addPoint([x, y1], true, true);
                // this.refreshData1();
               /* setInterval(function () {
                   // var x = (new Date()).getTime(), // current time
                    //this.refreshData1();
                       // this.y = this.datavalue;
                        console.log("ECT");
                        //console.log(this.y);
                       y1 = 50;
                      // y1=this.datavalue;
                       console.log(y1);
                        series.addPoint([x, y1], true, true);
                        x = x + index ;

                }, 20000);*/

                }
        }
        },
        title: {
          text: 'Linechart'
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Line 1',
          /*data: 
            (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
    
                for (i = -999; i <= 0; i += 1) {
                    data.push([
                        0,
                        0
                    ]);
                }
                return data;
            }())*/
         
        }],
        xAxis : {
            type: 'datetime',
            
          },
          
      });
}


    ngOnInit() {
                }

}

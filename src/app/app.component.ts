import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Telemetry View';
  
  authToken : any;
  interval :any;
 
  constructor(private http:HttpClient) {
      this.btnView1 = 'btn-clicked';
      this.btnVehicleData = 'btn-default';
      this.btnPerformanceBehaviour = 'btn-default';
      this.btnVehicleHealth = 'btn-default';
      this.btnCrashReport = 'btn-default';
      let token : any;
      this.http.post('http://119.81.217.94:8080/api/auth/login', {'username':environment.username,'password':environment.password})
      .subscribe(res => {
          token = res;
          this.authToken =  'Bearer ' + token.token; 
          console.log(this.authToken);
          this.fetchTs();
          //this.refreshData1();
          this.interval = setInterval(() => { 
              this.refreshData();
          }, environment.scantime);
      });
  }
  
//Code for fetching time form ts for giving start point and end point for fetching the data.
  
  ts : Array<any>;
  
//Function to convert data to min and seconds.
  converts(timeInSeconds){
      let minutes = Math.floor(timeInSeconds/60);
      let seconds = Math.floor(timeInSeconds%60);
      //Returning data in the form of array .
      return [minutes, seconds];
  }
  
  setStartAndEndPoints(){
      this.duration += environment.scantime;
      this.min = this.converts(this.duration/1000);
      this.endpoint = this.startpoint;
      this.startpoint = this.endpoint - environment.scantime;
  }
  
  current;
  startpoint;
  endpoint;
  
  parameter_startTime = "Curr_Time";
  thingsboardDeviceData : any;
  fetchTs() {
      this.ts = [];
      let url = environment.urlBase + this.parameter_startTime;
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
                         this.ts.push({"key":key,"value":val.ts});
                  });
               });    
              this.current = this.ts[0].value;
               //Storing start and end points initially for first iteration                      
              this.endpoint = this.current;
              this.startpoint = this.endpoint - environment.scantime;
              console.log(this.endpoint,this.startpoint); 
              this.refreshData();
          },
          err => {
              console.log("Error occured." + err)
              for(var errItem in err){
                  console.log(errItem)
                  console.log(err[errItem])
              }
          });
  }
  
  duration = 0;
  refreshedTs = [];
  generalInfoTimeline = [];
  min = [];
  
  dateTime = [];
  refreshDateTime(parameters){
      let startTime = "&startTs=" + this.startpoint + "&endTs=" + this.endpoint + "&interval="+environment.interval+"&limit="+environment.limit+"&agg=NONE";
      let url = environment.urlBase + parameters + startTime;
      
      this.http.get(url,{headers:{'Content-Type':'application/json','X-Authorization': this.authToken}})
      .subscribe(
              res => {
                  let refreshedValue = [];
                  this.thingsboardDeviceData = res;
                  let tbDataKeys = Object.keys(this.thingsboardDeviceData);
                  tbDataKeys.forEach(key => {
                      let value = this.thingsboardDeviceData[key];
                      value.forEach(val =>{
                              refreshedValue.push({"key":key,"value":val.value});
                              this.generalInfoTimeline.push({"key":key,"value":val.ts});
                          });  
                      this.dateTime = refreshedValue.map(x => Object.assign({}, x));
                  });
                  this.setStartAndEndPoints();
              },
              err => {
                  console.log("Error occured." + err)
                  for(var errItem in err){
                      console.log(errItem)
                      console.log(err[errItem])
                  }
              });
      }
    
  vehicleData = [];
  refreshVehicleData(parameters){
      let startTime = "&startTs=" + this.startpoint + "&endTs=" + this.endpoint + "&interval="+environment.interval+"&limit="+environment.limit+"&agg=NONE";
      let url = environment.urlBase + parameters + startTime;
      
      this.http.get(url,{headers:{'Content-Type':'application/json','X-Authorization': this.authToken}})
      .subscribe(
              res => {
                  let refreshedValue = [];
                  this.thingsboardDeviceData = res;
                  let tbDataKeys = Object.keys(this.thingsboardDeviceData);
                  tbDataKeys.forEach(key => {
                      let value = this.thingsboardDeviceData[key];
                      value.forEach(val =>{
                              refreshedValue.push({"key":key,"value":val.value});
                              this.generalInfoTimeline.push({"key":key,"value":val.ts});
                          });  
                      this.vehicleData = refreshedValue.map(x => Object.assign({}, x));
                  });
                  this.setStartAndEndPoints();
              },
              err => {
                  console.log("Error occured." + err)
                  for(var errItem in err){
                      console.log(errItem)
                      console.log(err[errItem])
                  }
              });
      }
  
  
  driverBehaviour = [];
  refreshDriverBehaviour(parameters){
      let startTime = "&startTs=" + this.startpoint + "&endTs=" + this.endpoint + "&interval="+environment.interval+"&limit="+environment.limit+"&agg=NONE";
      let url = environment.urlBase + parameters + startTime;
      
      this.http.get(url,{headers:{'Content-Type':'application/json','X-Authorization': this.authToken}})
      .subscribe(
              res => {
                  let refreshedValue = [];
                  this.thingsboardDeviceData = res;
                  let tbDataKeys = Object.keys(this.thingsboardDeviceData);
                  tbDataKeys.forEach(key => {
                      let value = this.thingsboardDeviceData[key];
                      value.forEach(val =>{
                              refreshedValue.push({"key":key,"value":val.value});
                              this.generalInfoTimeline.push({"key":key,"value":val.ts});
                          });  
                      this.driverBehaviour = refreshedValue.map(x => Object.assign({}, x));
                  });
                  this.setStartAndEndPoints();
              },
              err => {
                  console.log("Error occured." + err)
                  for(var errItem in err){
                      console.log(errItem)
                      console.log(err[errItem])
                  }
              });
      }
  
  
  generalInfo = [];
  refreshGeneralInfo(parameters){
    let startTime = "&startTs=" + this.startpoint + "&endTs=" + this.endpoint + "&interval="+environment.interval+"&limit="+environment.limit+"&agg=NONE";
    let url = environment.urlBase + parameters + startTime;
    
    this.http.get(url,{headers:{'Content-Type':'application/json','X-Authorization': this.authToken}})
    .subscribe(
            res => {
                let refreshedValue = [];
                this.thingsboardDeviceData = res;
                let tbDataKeys = Object.keys(this.thingsboardDeviceData);
                tbDataKeys.forEach(key => {
                    let value = this.thingsboardDeviceData[key];
                    value.forEach(val =>{
                            refreshedValue.push({"key":key,"value":val.value});
                            this.generalInfoTimeline.push({"key":key,"value":val.ts});
                        });  
                    this.generalInfo = refreshedValue.map(x => Object.assign({}, x));
                });
                this.setStartAndEndPoints();
            },
            err => {
                console.log("Error occured." + err)
                for(var errItem in err){
                    console.log(errItem)
                    console.log(err[errItem])
                }
            });
    }
  
  vehicleHealth = [];
  refreshVehicleHealth(parameters){
      let startTime = "&startTs=" + this.startpoint + "&endTs=" + this.endpoint + "&interval="+environment.interval+"&limit="+environment.limit+"&agg=NONE";
      let url = environment.urlBase + parameters + startTime;
      
      this.http.get(url,{headers:{'Content-Type':'application/json','X-Authorization': this.authToken}})
      .subscribe(
              res => {
                  let refreshedValue = [];
                  this.thingsboardDeviceData = res;
                  let tbDataKeys = Object.keys(this.thingsboardDeviceData);
                  tbDataKeys.forEach(key => {
                      let value = this.thingsboardDeviceData[key];
                      value.forEach(val =>{
                              refreshedValue.push({"key":key,"value":val.value});
                              this.generalInfoTimeline.push({"key":key,"value":val.ts});
                          });  
                      this.vehicleHealth = refreshedValue.map(x => Object.assign({}, x));
                  });
                  this.setStartAndEndPoints();
              },
              err => {
                  console.log("Error occured." + err)
                  for(var errItem in err){
                      console.log(errItem)
                      console.log(err[errItem])
                  }
              });
      }
    
  pCodes = [];
  refreshpCodes(parameters){
      let startTime = "&startTs=" + this.startpoint + "&endTs=" + this.endpoint + "&interval="+environment.interval+"&limit="+environment.limit+"&agg=NONE";
      let url = environment.urlBase + parameters + startTime;
      
      this.http.get(url,{headers:{'Content-Type':'application/json','X-Authorization': this.authToken}})
      .subscribe(
              res => {
                  let refreshedValue = [];
                  this.thingsboardDeviceData = res;
                  let tbDataKeys = Object.keys(this.thingsboardDeviceData);
                  tbDataKeys.forEach(key => {
                      let value = this.thingsboardDeviceData[key];
                      value.forEach(val =>{
                          console.log(val.value);
                          this.pCodes = val.value.split(',');
                          console.log(this.pCodes);
                      });
                  });
                  this.setStartAndEndPoints();
              },
              err => {
                  console.log("Error occured." + err)
                  for(var errItem in err){
                      console.log(errItem)
                      console.log(err[errItem])
                  }
              });
      }
   
  
  refreshData() {
      
      let parametersGeneralInfo = "Odometer_Val,Curr_Time,IMEI_number,Vehicle_VIN,Curr_Date";
      this.refreshGeneralInfo(parametersGeneralInfo);
      
      let parametersVehicleHealth = "Vehicle_ECT,Bat_Volt_Sts,MIL_Status,No_Of_DTC_Prs";
      this.refreshVehicleHealth(parametersVehicleHealth);
      
      let parametersPcodes = "DTC_Info_List";
      this.refreshpCodes(parametersPcodes);
      
      let parametersDateTime = "Curr_Date,Curr_Time"
      this.refreshDateTime(parametersDateTime);    
          
      let parametersVehicleData = "Vehicle_Speed,"
          + "Vehicle_Engine_RPM"
          + "Vehicle_ECT,"
          + "Vehicle_MAF,"
          + "Vehicle_MAP,"
          + "Intake_Air_Temp,"
          + "Abs_Throttle_Pos,"
          + "Bat_Volt_Sts,"
          + "Abs_Acc_Pedal_Pos,"
          + "Veh_Pos_Long,"
          + "Veh_Pos_Latt,"
          + "IMEI_number,"
          + "Engine_Load,"
          + "Engine_Retarder_Torque";
      
      this.refreshVehicleData(parametersVehicleData);
      
      let parametersDriverBehaviour = 
            "Swirving_Event_Cnt,"
          + "Harsh_Accel_Cnt,"
          + "Harsh_Breaking_Cnt,"
          + "Long_Idling_Cnt,"
          + "Short_Idling_Cnt,"
          + "Harsh_Breaking_Cnt,"
          + "Bat_Discon_Event_Cnt,"
          + "Eng_Breaking_Event_Cnt,"
          + "Eng_High_Rev_Cnt,"
          + "Over_Speeding_Lvl1_Cnt,"
          + "Over_Speeding_Lvl2_Cnt";
      
      this.refreshDriverBehaviour(parametersDriverBehaviour);
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
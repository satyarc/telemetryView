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
 
  constructor(private http:HttpClient){
      this.btnView1 = 'btn-clicked';
      this.btnVehicleData = 'btn-default';
      this.btnPerformanceBehaviour = 'btn-default';
      this.btnVehicleHealth = 'btn-default';
      this.btnCrashReport = 'btn-default';
      
      let token : any;
      this.http.post(environment.loginUrl, {'username':environment.username,'password':environment.password})
      .subscribe(res => {
          token = res;
          this.authToken =  'Bearer ' + token.token; 
          console.log(this.authToken);
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
    
    current;
    startpoint;
    endpoint;
    endTime;
    
    setStartTime(datetime){
        this.startpoint = datetime.getTime();
        this.endpoint = this.startpoint + environment.scantime;
        this.refreshData();
        this.interval = setInterval(() => { 
            this.refreshData();
        }, environment.scantime);
    }
    
    setEndTime(datetime){
        this.endTime = datetime.getTime();
    }
    
    duration = 0;
    min = [];
    setNextStartAndEndPoints(){
        this.duration += environment.scantime;
        this.min = this.converts(this.duration/1000);
        this.startpoint = this.endpoint;
        //if(this.endpoint < (this.endTime - environment.scantime)){
            this.endpoint = this.startpoint + environment.scantime;
        //}
    }
    
    thingsboardDeviceData : any;
    
    pageInfo = {    
                    "Curr_Date":" ",
                    "Curr_Time":" ",
                    "Odometer_Val":" ",
                    "IMEI_number":" ",
                    "Vehicle_VIN":" ",
                    "Vehicle_ECT":" ",
                    "Bat_Volt_Sts":" ",
                    "MIL_Status":" ",
                    "No_Of_DTC_Prs":" ",
                    "Vehicle_Engine_RPM":" ",
                    "Vehicle_MAF":" ",
                    "Vehicle_MAP":" ",
                    "Intake_Air_Temp":" ",
                    "Abs_Throttle_Pos":" ",
                    "Abs_Acc_Pedal_Pos":" ",
                    "Veh_Pos_Long":" ",
                    "Veh_Pos_Latt":" ",
                    "Engine_Load":" ",
                    "Engine_Retarder_Torque":" ",
                    "Swirving_Event_Cnt":" ",
                    "DTC_Info_List":" ",
                    "Harsh_Accel_Cnt":" ",
                    "Harsh_Breaking_Cnt":" ",
                    "Long_Idling_Cnt":" ",
                    "Short_Idling_Cnt":" ",
                    "Bat_Discon_Event_Cnt":" ",
                    "Eng_Breaking_Event_Cnt":" ",
                    "Eng_High_Rev_Cnt":" ",
                    "Over_Speeding_Lvl1_Cnt":" ",
                    "Over_Speeding_Lvl2_Cnt":" "
            };
    
    pageInfoList = []
    timeLine = []
    engineRpm = []
    engineLoad = []

    refreshData(){
      let startTime = "&startTs=" + this.startpoint + "&endTs=" + this.endpoint + "&interval="+environment.interval+"&limit="+environment.limit+"&agg=NONE";
      let url = environment.urlBase + Object.keys(this.pageInfo) + startTime;
      console.log(url);
      
      this.http.get(url,{headers:{'Content-Type':'application/json','X-Authorization': this.authToken}})
      .subscribe(
              res => {
                  this.thingsboardDeviceData = res;
                  console.log(this.thingsboardDeviceData);
    
                  for(let key in this.pageInfo) {
                      let value = this.thingsboardDeviceData[key];
                      if(!(value == null)){
                          if(value.length > 0){
                              value.forEach(val =>{
                                      if(!(val.value == null)){
                                          this.pageInfo[key] = val.value;
                                      }
                                  });
                          }
                      }
                  }
                  console.log(this.pageInfo);
                  
                  // Accumulate limited past data
                  this.pageInfoList.push({'ts':new Date(),'value':this.pageInfo});
                  if(this.pageInfoList.length > environment.dataSizeLimit){
                      this.pageInfoList.shift();
                  }
                  
                  //data for charts
                  this.engineRpm.push(this.pageInfo.Vehicle_Engine_RPM);
                  this.engineLoad.push(this.pageInfo.Engine_Load);
                  this.timeLine.push(new Date());
                  
                  this.setNextStartAndEndPoints();
              },
              err => {
                  console.log("Error occured." + err)
                  for(var errItem in err){
                      console.log(errItem)
                      console.log(err[errItem])
                  }
              });
      }
    
    ngOnInit() {
      this.duration += environment.scantime;
      this.min = this.converts(this.duration/1000);
    }
 

  chartData = [{data:this.engineRpm, label:"Engine RPM"},
                     {data:this.engineLoad, label:"Engine Load"}
                    ]
  
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
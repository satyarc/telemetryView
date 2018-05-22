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
      this.btnEmissionReport = 'btn-default';
      this.btnGeoLocation = 'btn-default';
      this.btnHistorical = 'btn_realHistorical';
      
      
      let token : any;
      this.http.post(environment.loginUrl, {'username':environment.username,'password':environment.password})
      .subscribe(res => {
          token = res;
          this.authToken =  'Bearer ' + token.token; 
          console.log(this.authToken);
          this.rt_startTime = new Date().getTime();
          this.refreshData();
          this.interval = setInterval(() => { 
              if(!this.historical){
                  this.refreshData();
              }
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
    
    rt_startTime;
    historical_startTime;
    historical_endTime;
    
    setStartTime(datetime){
        this.historical_startTime = datetime.getTime();
    }
    
    setEndTime(datetime){
        this.historical_endTime = datetime.getTime();
        this.loadHistoticalDataBetween(this.historical_startTime,this.historical_endTime)
    }
    
    duration = 0;
    min = [];

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
        this.loadHistoticalDataBetween(this.rt_startTime,new Date().getTime())
    }
    
    lat : number;
    long: number;
    loadHistoticalDataBetween(startTime:any,endTime:any){
        let timeInterval = "&startTs=" + startTime + "&endTs=" + endTime + "&interval="+(endTime - startTime)+"&limit="+environment.limit+"&agg=NONE";
        let url = environment.urlBase + Object.keys(this.pageInfo) + timeInterval;
        console.log(url);
        
        this.http.get(url,{headers:{'Content-Type':'application/json','X-Authorization': this.authToken}})
        .subscribe(
            res => {
                this.pageInfoList = JSON.parse(JSON.stringify(res));
                console.log(this.pageInfoList);
                
                this.lat = Number(this.pageInfoList && (this.pageInfoList["Veh_Pos_Latt"].length > 0)?this.pageInfoList['Veh_Pos_Latt'][this.pageInfoList['Veh_Pos_Latt'].length - 1].value:0);
                this.long = Number(this.pageInfoList && (this.pageInfoList["Veh_Pos_Long"].length > 0)?this.pageInfoList['Veh_Pos_Long'][this.pageInfoList['Veh_Pos_Long'].length - 1].value:0);
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
        this.realRhist =  "Switch to Real time";
    }
 

  selectedView :any;
  view1 = true;
  viewVehicleData = false;
  viewPerformanceBehaviour = false;
  viewVehicleHealth = false;
  viewCrashReport = false;
  viewEmissionReport = false;
  viewGeolocation = false;
  
  historical = true;
  
  
  btnView1: string;
  btnVehicleData: string;
  btnPerformanceBehaviour: string;
  btnVehicleHealth: string;
  btnCrashReport: string;
  btnEmissionReport: string;
  btnGeoLocation:string
  
  btnHistorical:string;
  
  clickedFlag : any;
  showView1(event){
      this.btnView1 = 'btn-clicked';
      this.btnVehicleData = 'btn-default';
      this.btnPerformanceBehaviour = 'btn-default';
      this.btnVehicleHealth = 'btn-default';
      this.btnCrashReport = 'btn-default';
      this.btnEmissionReport = 'btn-default';
      this.btnGeoLocation = 'btn-default';
      this.view1 = true;
      this.viewVehicleData = false;
      this.viewPerformanceBehaviour = false;
      this.viewVehicleHealth = false;
      this.viewCrashReport = false;
      this.viewEmissionReport = false;
      this.viewGeolocation = false;
  }
  
  showViewVehicleData(event){
      this.btnView1 = 'btn-default';
      this.btnVehicleData = 'btn-clicked';
      this.btnPerformanceBehaviour = 'btn-default';
      this.btnVehicleHealth = 'btn-default';
      this.btnCrashReport = 'btn-default';
      this.btnEmissionReport = 'btn-default';
      this.btnGeoLocation = 'btn-default';
      this.view1 = false;
      this.viewVehicleData = true;
      this.viewPerformanceBehaviour = false;
      this.viewVehicleHealth = false;
      this.viewCrashReport = false;
      this.viewEmissionReport = false;
      this.viewGeolocation = false;
  }
  
  showPerformanceBehaviour(event){
      this.btnView1 = 'btn-default';
      this.btnVehicleData = 'btn-default';
      this.btnPerformanceBehaviour = 'btn-clicked';
      this.btnVehicleHealth = 'btn-default';
      this.btnCrashReport = 'btn-default';
      this.btnEmissionReport = 'btn-default';
      this.btnGeoLocation = 'btn-default';
      this.view1 = false;
      this.viewVehicleData = false;
      this.viewPerformanceBehaviour = true;
      this.viewVehicleHealth = false;
      this.viewCrashReport = false;
      this.viewEmissionReport = false;
      this.viewGeolocation = false;
  }
  
  showVehicleHealth(event){
      this.btnView1 = 'btn-default';
      this.btnVehicleData = 'btn-default';
      this.btnPerformanceBehaviour = 'btn-default';
      this.btnVehicleHealth = 'btn-clicked';
      this.btnCrashReport = 'btn-default';
      this.btnEmissionReport = 'btn-default';
      this.btnGeoLocation = 'btn-default';
      this.view1 = false;
      this.viewVehicleData = false;
      this.viewPerformanceBehaviour = false;
      this.viewVehicleHealth = true;
      this.viewCrashReport = false;
      this.viewEmissionReport = false;
      this.viewGeolocation = false;
  }
  
  showCrashReport(event){
      this.btnView1 = 'btn-default';
      this.btnVehicleData = 'btn-default';
      this.btnPerformanceBehaviour = 'btn-default';
      this.btnVehicleHealth = 'btn-default';
      this.btnCrashReport = 'btn-clicked';
      this.btnEmissionReport = 'btn-default';
      this.btnGeoLocation = 'btn-default';
      this.view1 = false;
      this.viewVehicleData = false;
      this.viewPerformanceBehaviour = false;
      this.viewVehicleHealth = false;
      this.viewCrashReport = true;
      this.viewEmissionReport = false;
      this.viewGeolocation = false;
  }
  
  showEmissionReport(event){
      this.btnView1 = 'btn-default';
      this.btnVehicleData = 'btn-default';
      this.btnPerformanceBehaviour = 'btn-default';
      this.btnVehicleHealth = 'btn-default';
      this.btnCrashReport = 'btn-default';
      this.btnEmissionReport = 'btn-clicked';
      this.btnGeoLocation = 'btn-default';
      this.view1 = false;
      this.viewVehicleData = false;
      this.viewPerformanceBehaviour = false;
      this.viewVehicleHealth = false;
      this.viewCrashReport = false;
      this.viewEmissionReport = true;
      this.viewGeolocation = false;
  }
  
  showGeoLocation(event){
      this.btnView1 = 'btn-default';
      this.btnVehicleData = 'btn-default';
      this.btnPerformanceBehaviour = 'btn-default';
      this.btnVehicleHealth = 'btn-default';
      this.btnCrashReport = 'btn-default';
      this.btnEmissionReport = 'btn-default';
      this.btnGeoLocation = 'btn-clicked';
      this.view1 = false;
      this.viewVehicleData = false;
      this.viewPerformanceBehaviour = false;
      this.viewVehicleHealth = false;
      this.viewCrashReport = false;
      this.viewEmissionReport = false;
      this.viewGeolocation = true;
  }
  
  realRhist =  "Switch to Real time";
  toggleHistorical(event){
      this.historical = !this.historical;
      if(this.realRhist === "Switch to Real time"){
          this.realRhist = "Switch to Historical";
      }else{
          this.realRhist = "Switch to Real time";
      }
  }
  
  userid :string;
  updateUserId(userid :string){
      this.userid = userid;
  }
  
  password:string;
  updatePassword(password : string){
      this.password = password;
  }
  
  loggedIn : any;
  login(event){
      if (this.userid === 'intellipredikt' && this.password === 'intellipredikt'){
          this.loggedIn = true;
      }
  }
  
  logout(event){
          this.loggedIn = false;
  }
}
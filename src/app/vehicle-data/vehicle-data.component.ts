import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-vehicle-data',
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.css']
})
export class VehicleDataComponent implements OnInit {
    
authToken : any;
urlbase = "https://cors-anywhere.herokuapp.com/"+"http://119.81.217.94:8080/api/plugins/telemetry/DEVICE/544004b0-c850-11e7-89af-f34162121867/values/timeseries?keys=";

parametersDateTime = "Curr_Date,Curr_Time"

parameters = "Vehicle_Speed,"
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



thingsboardDeviceData : any;

vehicleData = [];
dateTime = [];

constructor(private http:HttpClient) {
    
    let token : any;
    this.http.post('http://119.81.217.94:8080/api/auth/login', {'username':'tenant@thingsboard.org','password':'tenant'})
    .subscribe(res => {
        token = res;
        this.authToken =  'Bearer ' + token.token; 
        console.log(this.authToken);
        
        let urlDateTime = this.urlbase + this.parametersDateTime;

        this.http.get(urlDateTime,{headers:{'Content-Type':'application/json','X-Authorization': this.authToken}})
        .subscribe(res => {
            this.thingsboardDeviceData = res;
                console.log(this.thingsboardDeviceData);
                let tbDataKeys = Object.keys(this.thingsboardDeviceData);
                
                tbDataKeys.forEach(key => {
                    console.log(key);
                    let value = this.thingsboardDeviceData[key];
                    value.forEach(val =>{
                        console.log(val.value);
                        this.dateTime.push({"key":key,"value":val.value});
                    });
                  });
                
                
            },
            err => {
                console.log("Error occured." + err)
                for(var errItem in err){
                    console.log(errItem)
                    console.log(err[errItem])
                }
            });  
        
        let url = this.urlbase + this.parameters;

        this.http.get(url,{headers:{'Content-Type':'application/json','X-Authorization': this.authToken}})
        .subscribe(res => {
            this.thingsboardDeviceData = res;
                console.log(this.thingsboardDeviceData);
                let tbDataKeys = Object.keys(this.thingsboardDeviceData);
                
                tbDataKeys.forEach(key => {
                    console.log(key);
                    let value = this.thingsboardDeviceData[key];
                    value.forEach(val =>{
                        console.log(val.value);
                        this.vehicleData.push({"key":key,"value":val.value});
                    });
                  });
                
                
            },
            err => {
                console.log("Error occured." + err)
                for(var errItem in err){
                    console.log(errItem)
                    console.log(err[errItem])
                }
            });  
    });
  }


  ngOnInit() {
  }

}

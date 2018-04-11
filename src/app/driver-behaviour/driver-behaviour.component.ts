import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-driver-behaviour',
  templateUrl: './driver-behaviour.component.html',
  styleUrls: ['./driver-behaviour.component.css']
})
export class DriverBehaviourComponent implements OnInit {

authToken : any;
urlbase = "https://cors-anywhere.herokuapp.com/"+"http://119.81.217.94:8080/api/plugins/telemetry/DEVICE/544004b0-c850-11e7-89af-f34162121867/values/timeseries?keys=";
parameters =      "Swirving_Event_Cnt,"
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
thingsboardDeviceData : any;

driverBehaviour = [];

constructor(private http:HttpClient) {
    
    let token : any;
    this.http.post('http://119.81.217.94:8080/api/auth/login', {'username':'tenant@thingsboard.org','password':'tenant'})
    .subscribe(res => {
        token = res;
        this.authToken =  'Bearer ' + token.token; 
        console.log(this.authToken);
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
                        //this.pCodes = val.value.split(',');
                        //console.log(this.pCodes);
                        this.driverBehaviour.push({"key":key,"value":val.value});
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

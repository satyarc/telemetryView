import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { RequestOptions } from "@angular/http/http";

@Component({
  selector: 'app-diagnotic-views',
  templateUrl: './diagnotic-views.component.html',
  styleUrls: ['./diagnotic-views.component.css']
})


export class DiagnoticViewsComponent implements OnInit {

    devicedetails  : any;
    thingsboardDeviceData : any;

    constructor(private http:HttpClient) {
        let authToken : any;
        this.http.post('http://119.81.217.94:8080/api/auth/login', {'username':'tenant@thingsboard.org','password':'tenant'})
        .subscribe(res => {
            authToken = res;

            let token =  'Bearer '+authToken.token; 
            console.log(token);
            let url = "https://cors-anywhere.herokuapp.com/"+"http://119.81.217.94:8080/api/plugins/telemetry/DEVICE/544004b0-c850-11e7-89af-f34162121867/values/timeseries?keys=Curr_Time,GSM_Packet_Cnt";

            this.ajaxCall(url,token,this.setThingsboardData);
            
            /*
            let headers = new HttpHeaders();
            headers.append('Content-Type','application/json');
            headers.append('X-Authorization', token);
            
            for (var item in headers){
                console.log(item);
                console.log(headers[item]);
            }
                   
            this.http.get(url,{headers:headers})
            .subscribe(res => {
                this.thingsboardDeviceData = res;
                console.log(this.thingsboardDeviceData);
                alert(this.thingsboardDeviceData);
                },
                err => {
                    console.log("Error occured." + err)
                    for(var errItem in err){
                        console.log(errItem)
                        console.log(err[errItem])
                    }
                });  */
        });
      }
    
        ajaxCall(url,token,cb){
            let xmlhttp_tb = new XMLHttpRequest();
            xmlhttp_tb.open("GET", url, true);    
            xmlhttp_tb.setRequestHeader("Content-Type", "application/json"); 
            xmlhttp_tb.setRequestHeader("X-Authorization", token); 
            xmlhttp_tb.send();
            
            xmlhttp_tb.onreadystatechange=function() {
                console.log(xmlhttp_tb.readyState);
                if (xmlhttp_tb.readyState == 4 && xmlhttp_tb.status == 200) {
                    let deployments = JSON.parse(xmlhttp_tb.responseText);
                    console.log(xmlhttp_tb.responseText);
                    cb(xmlhttp_tb.responseText);
                }else{
                    console.log("status");
                    console.log(xmlhttp_tb.status);
                }
            }
        }
    
    
        setThingsboardData(data:any){
            let curTIme = JSON.parse(data).Curr_Time;
            let gsmPktCnt = JSON.parse(data).GSM_Packet_Cnt;
            
            for(var item in curTIme){
                document.getElementById("Curr_Time_ts").innerHTML = curTIme[item]['ts'];
                document.getElementById("Curr_Time_value").innerHTML = curTIme[item]['value'];
            }
            
            for(var item in curTIme){
                document.getElementById("GSM_Packet_Cnt_ts").innerHTML = gsmPktCnt[item]['ts'];
                document.getElementById("GSM_Packet_Cnt_value").innerHTML = gsmPktCnt[item]['value'];
            }
            //document.getElementById("Curr_Time_ts").innerHTML = JSON.parse(data).Curr_Time;
            //this.thingsboardDeviceData = data;
        }
    
        ngOnInit() {        
        }
    
      selectedCode : any;
      selectedTroubleObject : any;
      
      showtroubleDetails(event){
          console.log(event.path[0].innerText);
          this.selectedCode = event.path[0].innerText;
          
          for (let trouble of this.devicedetails.troubleCodes){
              if(trouble.code === this.selectedCode){
                  this.selectedTroubleObject = trouble;
                  break;
              }
          }
      }
}

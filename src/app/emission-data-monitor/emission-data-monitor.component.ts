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
  constructor(private http:HttpClient) {
      this.http.get('assets/08022018_0652_NGK.csv', {responseType: 'text'})
      .subscribe(
          data => {
              console.log(data);
              let lines = [];
              let allTextLines = data.split(/\r|\n|\r/);  
              allTextLines.forEach(line =>{
                  let dataItem = line.split(',');
                  if(dataItem != null){
                      let dterm = (dataItem[2])? dataItem[2].split(':'):'';
                      let d = (dterm && dterm[1].length > 0) ? dterm[1].split(" ").join(""):"";
                      
                      let hterm = (dataItem[1])? dataItem[1].split(':'):'';
                      let h = (hterm && hterm[1].length > 0) ? hterm[1].split(" ").join(""):"";
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
                               pn = numD & 0x00000000000000ffffffffff00000000;
                               pm = numD & 0x000000000000000000000000ffffffff;
                          }
                          if(h === "0602"){
                               nox02 = numD & 0x0000000000000000ffffffff00000000;
                               nox = numD & 0x000000000000000000000000ffffff00;
                          }
                          if(h === "0603"){
                               uegoafr = numD & 0x0000000000000000ffffff0000000000;
                               uego02 = numD & 0x000000000000000000000000ffffffff;
                          }
                      
                          dataItem.push("pn:"+ (pn)?pn.toString():"0");
                          dataItem.push("pm:"+ (pm)?pm.toString():"0");
                          dataItem.push("nox02:"+ (nox02)?nox02.toString():"0");
                          dataItem.push("nox:"+ (nox)?nox.toString():"0");
                          dataItem.push("uegoafr:"+ (uegoafr)?uegoafr.toString():"0");
                          dataItem.push("uego02:"+ (uego02)?uego02.toString():"0");
                      }
                      this.emissionDataItems.push(dataItem);
                  }
              });
          },
          error => {
              console.log(error);
          }
      );
  }
  
  ngOnInit() {
  }

}

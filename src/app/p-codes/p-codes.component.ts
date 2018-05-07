import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-p-codes',
  inputs: ['pageInfo:pageInfo'],
  templateUrl: './p-codes.component.html',
  styleUrls: ['./p-codes.component.css']
})
export class PCodesComponent implements OnInit {

  constructor(private http:HttpClient) {
      let token : any;
      this.http.post(environment.loginUrl, {'username':environment.username,'password':environment.password})
      .subscribe(res => {
          token = res;
          this.authToken =  'Bearer ' + token.token; 
          console.log(this.authToken);
  });
  }

  ngOnInit() {
  }
  
  selectedCode : String;
  selectedTroubleObject :any;
  troubleDescriptionSegments : Array<any>;
  
  authToken : any;
      
  showpcodeDetails(event){
      console.log(event.path[0].innerText);
      this.selectedCode = event.path[0].innerText;
      
      let url = environment.urlBase + this.selectedCode;
      this.http.get(url,{headers:{'Content-Type':'application/json','X-Authorization': this.authToken}})
      .subscribe(res => {
          this.selectedTroubleObject = res;
              console.log(this.selectedTroubleObject);
              let troubleKeys = Object.keys(this.selectedTroubleObject);
              troubleKeys.forEach(key => {
                  let value = this.selectedTroubleObject[key];
                  value.forEach(val =>{
                      console.log(val.value);
                      this.troubleDescriptionSegments = val.value.split(',');
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
  }

}

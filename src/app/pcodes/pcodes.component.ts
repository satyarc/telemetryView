import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pcodes',
  inputs: ['pCodes:pCodes'],
  templateUrl: './pcodes.component.html',
  styleUrls: ['./pcodes.component.css']
})
export class PcodesComponent implements OnInit {
  
   

    constructor() {
        
    }
    
  ngOnInit() {
      //this.getPosts();
  }
  

  
    selectedCode : any;
    selectedTroubleObject : any;
    troubleDescriptionSegments : Array<any>;
    
  /*
    showpcodeDetails(event){
        console.log(event.path[0].innerText);
        this.selectedCode = event.path[0].innerText;
        
        let url = this.urlbase + this.selectedCode;

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
    }*/
}

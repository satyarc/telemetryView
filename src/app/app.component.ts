import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Telemetry View';
  
  constructor() {
      
  }
  
  views = ["View 1","View 2","View 3","View 4"];
  
  
  ngOnInit() {
      
  }
  
  selectedView :any;
  showView1 = true;
  showView(event){
      console.log(event.path[0].innerText);
      this.selectedView = event.path[0].innerText;
      
      if(this.selectedView === "View 1"){
          this.showView1 = true;
      }
      else{
          this.showView1 = false;
      }
  }
  
  
}

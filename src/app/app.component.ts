import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Telemetry View';
  
  constructor() {
      this.bntStyle1  = 'btn-clicked';
      this.bntStyle2  = 'btn-default';
      this.bntStyle3  = 'btn-default';
      this.bntStyle4  = 'btn-default';
  }
  
  ngOnInit() {
      
  }
  
  selectedView :any;
  view1 = true;
  view2 = false;
  view3 = false;
  view4 = false;
  
  bntStyle1: string;
  bntStyle2: string;
  bntStyle3: string;
  bntStyle4: string;
  
  clickedFlag : any;
  showView1(event){
      this.bntStyle1 = 'btn-clicked';
      this.bntStyle2 = 'btn-default';
      this.bntStyle3 = 'btn-default';
      this.bntStyle4 = 'btn-default';
      this.view1 = true;
      this.view2 = false;
      this.view3 = false;
      this.view4 = false;
  }
  
  showView2(event){
      this.bntStyle1 = 'btn-default';
      this.bntStyle2 = 'btn-clicked';
      this.bntStyle3 = 'btn-default';
      this.bntStyle4 = 'btn-default';
      this.view1 = false;
      this.view2 = true;
      this.view3 = false;
      this.view4 = false;
  }
  
  showView3(event){
      this.bntStyle1 = 'btn-default';
      this.bntStyle2 = 'btn-default';
      this.bntStyle3 = 'btn-clicked';
      this.bntStyle4 = 'btn-default';
      this.view1 = false;
      this.view2 = false;
      this.view3 = true;
      this.view4 = false;
  }
  
  showView4(event){
      this.bntStyle1 = 'btn-default';
      this.bntStyle2 = 'btn-default';
      this.bntStyle3 = 'btn-default';
      this.bntStyle4 = 'btn-clicked';
      this.view1 = false;
      this.view2 = false;
      this.view3 = false;
      this.view4 = true;
  }
}

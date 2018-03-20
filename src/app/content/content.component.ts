import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  inputs: ['view: view','device: device'],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
    
  constructor() { }

  ngOnInit() {
  }

}

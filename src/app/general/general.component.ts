import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  inputs: ['pageInfoList:pageInfoList','min:min'],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

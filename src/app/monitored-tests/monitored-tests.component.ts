import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitored-tests',
  inputs: ['tObject:troubleObject'],
  templateUrl: './monitored-tests.component.html',
  styleUrls: ['./monitored-tests.component.css']
})
export class MonitoredTestsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

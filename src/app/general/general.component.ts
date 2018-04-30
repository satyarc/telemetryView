import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-general',
  inputs: ['generalInfo:generalInfo','min:min'],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})

export class GeneralComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}

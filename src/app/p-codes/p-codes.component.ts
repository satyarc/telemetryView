import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-codes',
  inputs: ['pageInfo:pageInfo'],
  templateUrl: './p-codes.component.html',
  styleUrls: ['./p-codes.component.css']
})
export class PCodesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

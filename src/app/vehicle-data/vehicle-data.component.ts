import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-vehicle-data',
  inputs: ['pageInfoList:pageInfoList'],
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.css']
})
export class VehicleDataComponent implements OnInit {

  constructor() {
      this.hideAllCharts();
      
  }

  ngOnInit() {
  }
  
  chartHeight = 500;
  chartWidth = 1150;
  
  s_chartHeight = 100;
  s_chartWidth = 100;
      
  view_table = true;
  hideAllCharts(){
      this.columnList.forEach(column =>{
          this.view_chart[column] = false;
      });
      this.view_table = false;
  }
  
  public hide(event) {
      this.hideAllCharts();
      this.view_table = true;
  }
  
  vehicleData = [];
  
  columns :any;

  analyzeData(event,pageInfoList) {
      this.view_table = true;
      this.columns = {
                      columns:{
                                  date:{title:'Date'},
                                  time:{title:'Time'},
                                  rpm:{title:'Engine RPM'},
                                  maf:{title:'MAF'},
                                  map:{title:'MAP'},
                                  airTemp:{title:'Intake Air Temperature'},
                                  absThrottlePos:{title:'ABS Throttle Pos'},
                                  absAccPedalPos:{title:'ABS ACC Pedal Pos'},
                                  posLong:{title:'POS Long'},
                                  posLatt:{title:'POS Latt'},
                                  engineLoad:{title:'Engine Load'},
                                  engineRetarderTorque:{title:'Engine Retarder Torque'}
                              },
                         hideSubHeader:true,
                         actions: false
                      };
      
      for(let tsIndex=0;tsIndex<pageInfoList["Vehicle_Engine_RPM"].length;tsIndex++){
          let timeStamp = (pageInfoList["Vehicle_Engine_RPM"] && pageInfoList["Vehicle_Engine_RPM"].length > 0)?pageInfoList["Vehicle_Engine_RPM"][tsIndex].ts:0;
          let date = new Date(timeStamp).getFullYear() + "/" + new Date(timeStamp).getMonth() + "/" + new Date(timeStamp).getDate(); 
          let time = new Date(timeStamp).getHours() + ":" + new Date(timeStamp).getMinutes() + ":" + new Date(timeStamp).getSeconds();
          this.vehicleData.push(
          {
              date:date,
              time:time,
              rpm:(pageInfoList["Vehicle_Engine_RPM"] && pageInfoList["Vehicle_Engine_RPM"].length > 0)?pageInfoList["Vehicle_Engine_RPM"][tsIndex].value:0,
              maf:(pageInfoList["Vehicle_MAF"] && pageInfoList["Vehicle_MAF"].length > 0)?pageInfoList["Vehicle_MAF"][tsIndex].value:0,
              map:(pageInfoList["Vehicle_MAP"] && pageInfoList["Vehicle_MAP"].length > 0)?pageInfoList["Vehicle_MAP"][tsIndex].value:0,
              airTemp:(pageInfoList["Intake_Air_Temp"] && pageInfoList["Intake_Air_Temp"].length > 0)?pageInfoList["Intake_Air_Temp"][tsIndex].value:0,
              absThrottlePos:(pageInfoList["Abs_Throttle_Pos"] && pageInfoList["Abs_Throttle_Pos"].length > 0)?pageInfoList["Abs_Throttle_Pos"][tsIndex].value:0,
              absAccPedalPos:(pageInfoList["Abs_Acc_Pedal_Pos"] && pageInfoList["Abs_Acc_Pedal_Pos"].length > 0)?pageInfoList["Abs_Acc_Pedal_Pos"][tsIndex].value:0,
              posLong:(pageInfoList["Veh_Pos_Long"] && pageInfoList["Veh_Pos_Long"].length > 0)?pageInfoList["Veh_Pos_Long"][tsIndex].value:0,
              posLatt:(pageInfoList["Veh_Pos_Latt"] && pageInfoList["Veh_Pos_Latt"].length > 0)?pageInfoList["Veh_Pos_Latt"][tsIndex].value:0,
              engineLoad:(pageInfoList["Engine_Load"] && pageInfoList["Engine_Load"].length > 0)?pageInfoList["Engine_Load"][tsIndex].value:0,
              engineRetarderTorque:(pageInfoList["Engine_Retarder_Torque"] && pageInfoList["Engine_Retarder_Torque"].length > 0)?pageInfoList["Engine_Retarder_Torque"][tsIndex].value:0,
          });
      }
  }
  
  view_chart = [];
  columnList = [
             'Vehicle_Engine_RPM',
             'Vehicle_MAF',
             'Vehicle_MAP',
             'Intake_Air_Temp',
             'Abs_Throttle_Pos',
             'Abs_Acc_Pedal_Pos',
             'Veh_Pos_Long',
             'Veh_Pos_Latt',
             'Engine_Load',
             'Engine_Retarder_Torque'
             ];
  
  chart_Vehicle_Engine_RPM = [];  
  showChart_Vehicle_Engine_RPM(event,pageInfoList){
      this.hideAllCharts();
      this.view_chart['Vehicle_Engine_RPM'] = true;
      let chartcolumns = ['T','Vehicle_Engine_RPM'];
      this.chart_Vehicle_Engine_RPM.push(chartcolumns);
      
      let timeSeriesValues = pageInfoList["Vehicle_Engine_RPM"];
      timeSeriesValues.forEach(timeSeriesValue => {
          let chartItems = [];
          chartItems.push(new Date(timeSeriesValue.ts));
          chartItems.push(parseInt(timeSeriesValue.value));
          this.chart_Vehicle_Engine_RPM.push(chartItems);
      });
  }
  
  Vehicle_Engine_RPM_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Vehicle_Engine_RPM,
          options: {'title': 'Engine_RPM',
              width: this.chartWidth,
              height: this.chartHeight}
        };
  
  Vehicle_Engine_RPM_chartDataS =  {
          chartType: 'LineChart',
          dataTable: this.chart_Vehicle_Engine_RPM,
          options: {'title': 'Engine_RPM',
              width: this.s_chartWidth,
              height: this.s_chartHeight}
        };
  
  chart_Vehicle_MAF = [];
  view_chart_Vehicle_MAF = false;
  showChart_Vehicle_MAF(event,pageInfoList){
      this.hideAllCharts();
      this.view_chart['Vehicle_MAF'] = true;
      let chartcolumns = ['T','Vehicle_MAF'];
      this.chart_Vehicle_MAF.push(chartcolumns);
      
      let timeSeriesValues = pageInfoList["Vehicle_MAF"];
      timeSeriesValues.forEach(timeSeriesValue => {
          let chartItems = [];
          chartItems.push(new Date(timeSeriesValue.ts));
          chartItems.push(parseInt(timeSeriesValue.value));
          this.chart_Vehicle_MAF.push(chartItems);
      });
      console.log(this.chart_Vehicle_MAF);
  }
  
  Vehicle_MAF_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Vehicle_MAF,
          options: {'title': 'MAF',
              width: this.chartWidth,
              height: this.chartHeight}
        };
  
  Vehicle_MAF_chartDataS =  {
          chartType: 'LineChart',
          dataTable: this.chart_Vehicle_MAF,
          options: {'title': 'MAF',
              width: this.s_chartWidth,
              height: this.s_chartHeight}
        };
  
  chart_Vehicle_MAP = [];
  view_chart_Vehicle_MAP = false;
  showChart_Vehicle_MAP(event,pageInfoList){
      this.hideAllCharts();
      this.view_chart['Vehicle_MAP'] = true;
      let chartcolumns = ['T','Vehicle_MAP'];
      this.chart_Vehicle_MAP.push(chartcolumns);
      
      let timeSeriesValues = pageInfoList["Vehicle_MAP"];
      timeSeriesValues.forEach(timeSeriesValue => {
          let chartItems = [];
          chartItems.push(new Date(timeSeriesValue.ts));
          chartItems.push(parseInt(timeSeriesValue.value));
          this.chart_Vehicle_MAP.push(chartItems);
      });
  }
  
  Vehicle_MAP_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Vehicle_MAP,
          options: {'title': 'MAP',
              width: this.chartWidth,
              height: this.chartHeight}
        };
  
  Vehicle_MAP_chartDataS =  {
          chartType: 'LineChart',
          dataTable: this.chart_Vehicle_MAP,
          options: {'title': 'MAP',
              width: this.s_chartWidth,
              height: this.s_chartHeight}
        };
  
  chart_Intake_Air_Temp = [];
  view_chart_Intake_Air_Temp = false;
  showChart_Intake_Air_Temp(event,pageInfoList){
      this.hideAllCharts();
      this.view_chart['Intake_Air_Temp'] = true;
      let chartcolumns = ['T','Intake_Air_Temp'];
      this.chart_Intake_Air_Temp.push(chartcolumns);
      
      let timeSeriesValues = pageInfoList["Intake_Air_Temp"];
      timeSeriesValues.forEach(timeSeriesValue => {
          let chartItems = [];
          chartItems.push(new Date(timeSeriesValue.ts));
          chartItems.push(parseInt(timeSeriesValue.value));
          this.chart_Intake_Air_Temp.push(chartItems);
      });
  }
  
  Intake_Air_Temp_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Intake_Air_Temp,
          options: {'title': 'Intake_Air_Temp',
              width: this.chartWidth,
              height: this.chartHeight}
        };
  
  Intake_Air_Temp_chartDataS =  {
          chartType: 'LineChart',
          dataTable: this.chart_Intake_Air_Temp,
          options: {'title': 'Intake_Air_Temp',
              width: this.s_chartWidth,
              height: this.s_chartHeight}
        };
  
  chart_Abs_Throttle_Pos = [];
  view_chart_Abs_Throttle_Pos = false;
  showChart_Abs_Throttle_Pos(event,pageInfoList){
      this.hideAllCharts();
      this.view_chart['Abs_Throttle_Pos'] = true;
      let chartcolumns = ['T','Abs_Throttle_Pos'];
      this.chart_Abs_Throttle_Pos.push(chartcolumns);
      
      let timeSeriesValues = pageInfoList["Abs_Throttle_Pos"];
      timeSeriesValues.forEach(timeSeriesValue => {
          let chartItems = [];
          chartItems.push(new Date(timeSeriesValue.ts));
          chartItems.push(parseInt(timeSeriesValue.value));
          this.chart_Abs_Throttle_Pos.push(chartItems);
      });
  }
  
  Abs_Throttle_Pos_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Abs_Throttle_Pos,
          options: {'title': 'Abs_Throttle_Pos',
              width: this.chartWidth,
              height: this.chartHeight}
        };
  
  Abs_Throttle_Pos_chartDataS =  {
          chartType: 'LineChart',
          dataTable: this.chart_Abs_Throttle_Pos,
          options: {'title': 'Abs_Throttle_Pos',
              width: this.s_chartWidth,
              height: this.s_chartHeight}
        };
  
  chart_Abs_Acc_Pedal_Pos = [];
  view_chart_Abs_Acc_Pedal_Pos = false;
  showChart_Abs_Acc_Pedal_Pos(event,pageInfoList){
      this.hideAllCharts();
      this.view_chart['Abs_Acc_Pedal_Pos'] = true;
      let chartcolumns = ['T','Abs_Acc_Pedal_Pos'];
      this.chart_Abs_Acc_Pedal_Pos.push(chartcolumns);
      
      let timeSeriesValues = pageInfoList["Abs_Throttle_Pos"];
      timeSeriesValues.forEach(timeSeriesValue => {
          let chartItems = [];
          chartItems.push(new Date(timeSeriesValue.ts));
          chartItems.push(parseInt(timeSeriesValue.value));
          this.chart_Abs_Acc_Pedal_Pos.push(chartItems);
      });
  }
  
  Abs_Acc_Pedal_Pos_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Abs_Acc_Pedal_Pos,
          options: {'title': 'Abs_Acc_Pedal_Pos',
              width: this.chartWidth,
              height: this.chartHeight}
        };
  
  Abs_Acc_Pedal_Pos_chartDataS =  {
          chartType: 'LineChart',
          dataTable: this.chart_Abs_Acc_Pedal_Pos,
          options: {'title': 'Abs_Acc_Pedal_Pos',
              width: this.s_chartWidth,
              height: this.s_chartHeight}
        };
  
  chart_Veh_Pos_Long = [];
  view_chart_Veh_Pos_Long = false;
  showChart_Veh_Pos_Long(event,pageInfoList){
      this.hideAllCharts();
      this.view_chart['Veh_Pos_Long'] = true;
      let chartcolumns = ['T','Veh_Pos_Long'];
      this.chart_Veh_Pos_Long.push(chartcolumns);
      
      let timeSeriesValues = pageInfoList["Veh_Pos_Long"];
      timeSeriesValues.forEach(timeSeriesValue => {
          let chartItems = [];
          chartItems.push(new Date(timeSeriesValue.ts));
          chartItems.push(parseInt(timeSeriesValue.value));
          this.chart_Veh_Pos_Long.push(chartItems);
      });
  }
  
  Veh_Pos_Long_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Veh_Pos_Long,
          options: {'title': 'Pos_Long',
              width: this.chartWidth,
              height: this.chartHeight}
        };
  Veh_Pos_Long_chartDataS =  {
          chartType: 'LineChart',
          dataTable: this.chart_Veh_Pos_Long,
          options: {'title': 'Pos_Long',
              width: this.s_chartWidth,
              height: this.s_chartHeight}
        };
  
  chart_Veh_Pos_Latt = [];
  view_chart_Veh_Pos_Latt = false;
  showChart_Veh_Pos_Latt(event,pageInfoList){
      this.hideAllCharts();
      this.view_chart['Veh_Pos_Latt'] = true;
      let chartcolumns = ['T','Veh_Pos_Latt'];
      this.chart_Veh_Pos_Latt.push(chartcolumns);
      
      let timeSeriesValues = pageInfoList["Veh_Pos_Latt"];
      timeSeriesValues.forEach(timeSeriesValue => {
          let chartItems = [];
          chartItems.push(new Date(timeSeriesValue.ts));
          chartItems.push(parseInt(timeSeriesValue.value));
          this.chart_Veh_Pos_Latt.push(chartItems);
      });
  }
  
  Veh_Pos_Latt_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Veh_Pos_Latt,
          options: {'title': 'Pos_Latt',
              width: this.chartWidth,
              height: this.chartHeight}
        };
  
  Veh_Pos_Latt_chartDataS =  {
          chartType: 'LineChart',
          dataTable: this.chart_Veh_Pos_Latt,
          options: {'title': 'Pos_Latt',
              width: this.s_chartWidth,
              height: this.s_chartHeight}
        };
  chart_Engine_Load = [];
  view_chart_Engine_Load = false;
  showChart_Engine_Load(event,pageInfoList){
      this.hideAllCharts();
      this.view_chart['Engine_Load'] = true;
      let chartcolumns = ['T','Engine_Load'];
      this.chart_Engine_Load.push(chartcolumns);
      
      let timeSeriesValues = pageInfoList["Engine_Load"];
      timeSeriesValues.forEach(timeSeriesValue => {
          let chartItems = [];
          chartItems.push(new Date(timeSeriesValue.ts));
          chartItems.push(parseInt(timeSeriesValue.value));
          this.chart_Engine_Load.push(chartItems);
      });
  }
  
  Engine_Load_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Engine_Load,
          options: {'title': 'Engine_Load',
              width: this.chartWidth,
              height: this.chartHeight}
        };
  
  Engine_Load_chartDataS =  {
          chartType: 'LineChart',
          dataTable: this.chart_Engine_Load,
          options: {'title': 'Engine_Load',
              width: this.s_chartWidth,
              height: this.s_chartHeight}
        };
  
  chart_Engine_Retarder_Torque = [];
  view_chart_Engine_Retarder_Torque = false;
  showChart_Engine_Retarder_Torque(event,pageInfoList){
      this.hideAllCharts();
      this.view_chart['Engine_Retarder_Torque'] = true;
      let chartcolumns = ['T','Engine_Retarder_Torque'];
      this.chart_Engine_Retarder_Torque.push(chartcolumns);
      
      let timeSeriesValues = pageInfoList["Engine_Retarder_Torque"];
      timeSeriesValues.forEach(timeSeriesValue => {
          let chartItems = [];
          chartItems.push(new Date(timeSeriesValue.ts));
          chartItems.push(parseInt(timeSeriesValue.value));
          this.chart_Engine_Retarder_Torque.push(chartItems);
      });
  }
  
  Engine_Retarder_Torque_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Engine_Retarder_Torque,
          options: {'title': 'Engine_Retarder_Torque',
              width: this.chartWidth,
              height: this.chartHeight}
        };
  Engine_Retarder_Torque_chartDataS =  {
          chartType: 'LineChart',
          dataTable: this.chart_Engine_Retarder_Torque,
          options: {'title': 'Engine_Retarder_Torque',
              width: this.s_chartWidth,
              height: this.s_chartHeight}
        };
}

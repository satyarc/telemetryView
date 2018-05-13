import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-vehicle-data',
  inputs: ['pageInfo:pageInfo','pageInfoList:pageInfoList'],
  templateUrl: './vehicle-data.component.html',
  styleUrls: ['./vehicle-data.component.css']
})
export class VehicleDataComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }
  
  view_table = true;
  
  chart_Vehicle_Engine_RPM = [];
  view_chart_Vehicle_Engine_RPM=false;
  showChart_Vehicle_Engine_RPM(event,pageInfoList){
      this.view_chart_Vehicle_Engine_RPM = true;
      this.view_table = false;
      let chartcolumns = ['T','Vehicle_Engine_RPM'];
      this.chart_Vehicle_Engine_RPM.push(chartcolumns);
      pageInfoList.forEach(pageInfo => {
          let chartItems = [];
          chartItems.push(pageInfo.ts);
          chartItems.push(parseInt(pageInfo.value.Vehicle_Engine_RPM));
          this.chart_Vehicle_Engine_RPM.push(chartItems);
      });
  }
  
  
  Vehicle_Engine_RPM_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Vehicle_Engine_RPM,
          options: {'title': 'Vehicle_Engine_RPM',
                      width: 950,
                      height: 300}
        };
  
  chart_Vehicle_MAF = [];
  view_chart_Vehicle_MAF = false;
  showChart_Vehicle_MAF(event,pageInfoList){
      this.view_chart_Vehicle_MAF = true;
      this.view_table = false;
      let chartcolumns = ['T','Vehicle_MAF'];
      this.chart_Vehicle_MAF.push(chartcolumns);
      pageInfoList.forEach(pageInfo => {
          let chartItems = [];
          chartItems.push(pageInfo.ts);
          chartItems.push(parseInt(pageInfo.value.Vehicle_MAF));
          this.chart_Vehicle_MAF.push(chartItems);
      });
  }
  
  Vehicle_MAF_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Vehicle_MAF,
          options: {'title': 'Vehicle_MAF',
                      width: 950,
                      height: 300}
        };
  
  chart_Vehicle_MAP = [];
  view_chart_Vehicle_MAP = false;
  showChart_Vehicle_MAP(event,pageInfoList){
      this.view_chart_Vehicle_MAP = true;
      this.view_table = false;
      let chartcolumns = ['T','Vehicle_MAP'];
      this.chart_Vehicle_MAP.push(chartcolumns);
      pageInfoList.forEach(pageInfo => {
          let chartItems = [];
          chartItems.push(pageInfo.ts);
          chartItems.push(parseInt(pageInfo.value.Vehicle_MAP));
          this.chart_Vehicle_MAP.push(chartItems);
      });
  }
  
  Vehicle_MAP_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Vehicle_MAP,
          options: {'title': 'Vehicle_MAP',
                      width: 950,
                      height: 300}
        };
  
  chart_Intake_Air_Temp = [];
  view_chart_Intake_Air_Temp = false;
  showChart_Intake_Air_Temp(event,pageInfoList){
      this.view_chart_Intake_Air_Temp = true;
      this.view_table = false;
      let chartcolumns = ['T','Intake_Air_Temp'];
      this.chart_Intake_Air_Temp.push(chartcolumns);
      pageInfoList.forEach(pageInfo => {
          let chartItems = [];
          chartItems.push(pageInfo.ts);
          chartItems.push(parseInt(pageInfo.value.Intake_Air_Temp));
          this.chart_Intake_Air_Temp.push(chartItems);
      });
  }
  
  Intake_Air_Temp_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Intake_Air_Temp,
          options: {'title': 'Intake_Air_Temp',
                      width: 950,
                      height: 300}
        };
  
  chart_Abs_Throttle_Pos = [];
  view_chart_Abs_Throttle_Pos = false;
  showChart_Abs_Throttle_Pos(event,pageInfoList){
      this.view_chart_Abs_Throttle_Pos = true;
      this.view_table = false;
      let chartcolumns = ['T','Abs_Throttle_Pos'];
      this.chart_Abs_Throttle_Pos.push(chartcolumns);
      pageInfoList.forEach(pageInfo => {
          let chartItems = [];
          chartItems.push(pageInfo.ts);
          chartItems.push(parseInt(pageInfo.value.Abs_Throttle_Pos));
          this.chart_Abs_Throttle_Pos.push(chartItems);
      });
  }
  
  Abs_Throttle_Pos_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Abs_Throttle_Pos,
          options: {'title': 'Abs_Throttle_Pos',
                      width: 950,
                      height: 300}
        };
  
  chart_Abs_Acc_Pedal_Pos = [];
  view_chart_Abs_Acc_Pedal_Pos = false;
  showChart_Abs_Acc_Pedal_Pos(event,pageInfoList){
      this.view_chart_Abs_Acc_Pedal_Pos = true;
      this.view_table = false;
      let chartcolumns = ['T','Abs_Acc_Pedal_Pos'];
      this.chart_Abs_Acc_Pedal_Pos.push(chartcolumns);
      pageInfoList.forEach(pageInfo => {
          let chartItems = [];
          chartItems.push(pageInfo.ts);
          chartItems.push(parseInt(pageInfo.value.Abs_Acc_Pedal_Pos));
          this.chart_Abs_Acc_Pedal_Pos.push(chartItems);
      });
  }
  
  Abs_Acc_Pedal_Pos_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Abs_Acc_Pedal_Pos,
          options: {'title': 'Abs_Acc_Pedal_Pos',
                      width: 950,
                      height: 300}
        };
  
  chart_Veh_Pos_Long = [];
  view_chart_Veh_Pos_Long = false;
  showChart_Veh_Pos_Long(event,pageInfoList){
      this.view_chart_Veh_Pos_Long = true;
      this.view_table = false;
      let chartcolumns = ['T','Veh_Pos_Long'];
      this.chart_Veh_Pos_Long.push(chartcolumns);
      pageInfoList.forEach(pageInfo => {
          let chartItems = [];
          chartItems.push(pageInfo.ts);
          chartItems.push(parseInt(pageInfo.value.Veh_Pos_Long));
          this.chart_Veh_Pos_Long.push(chartItems);
      });
  }
  
  Veh_Pos_Long_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Veh_Pos_Long,
          options: {'title': 'Veh_Pos_Long',
                      width: 950,
                      height: 300}
        };
  
  chart_Veh_Pos_Latt = [];
  view_chart_Veh_Pos_Latt = false;
  showChart_Veh_Pos_Latt(event,pageInfoList){
      this.view_chart_Veh_Pos_Latt = true;
      this.view_table = false;
      let chartcolumns = ['T','Veh_Pos_Latt'];
      this.chart_Veh_Pos_Latt.push(chartcolumns);
      pageInfoList.forEach(pageInfo => {
          let chartItems = [];
          chartItems.push(pageInfo.ts);
          chartItems.push(parseInt(pageInfo.value.Veh_Pos_Latt));
          this.chart_Veh_Pos_Latt.push(chartItems);
      });
  }
  
  Veh_Pos_Latt_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Veh_Pos_Latt,
          options: {'title': 'Veh_Pos_Latt',
                      width: 950,
                      height: 300}
        };
  
  chart_Engine_Load = [];
  view_chart_Engine_Load = false;
  showChart_Engine_Load(event,pageInfoList){
      this.view_chart_Engine_Load = true;
      this.view_table = false;
      let chartcolumns = ['T','Engine_Load'];
      this.chart_Engine_Load.push(chartcolumns);
      pageInfoList.forEach(pageInfo => {
          let chartItems = [];
          chartItems.push(pageInfo.ts);
          chartItems.push(parseInt(pageInfo.value.Engine_Load));
          this.chart_Engine_Load.push(chartItems);
      });
  }
  
  Engine_Load_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Engine_Load,
          options: {'title': 'Engine_Load',
                      width: 950,
                      height: 300}
        };
  
  chart_Engine_Retarder_Torque = [];
  view_chart_Engine_Retarder_Torque = false;
  showChart_Engine_Retarder_Torque(event,pageInfoList){
      this.view_chart_Engine_Retarder_Torque = true;
      this.view_table = false;
      let chartcolumns = ['T','Engine_Retarder_Torque'];
      this.chart_Engine_Retarder_Torque.push(chartcolumns);
      pageInfoList.forEach(pageInfo => {
          let chartItems = [];
          chartItems.push(pageInfo.ts);
          chartItems.push(parseInt(pageInfo.value.Engine_Retarder_Torque));
          this.chart_Engine_Retarder_Torque.push(chartItems);
      });
  }
  
  Engine_Retarder_Torque_chartDataL =  {
          chartType: 'LineChart',
          dataTable: this.chart_Engine_Retarder_Torque,
          options: {'title': 'Engine_Retarder_Torque',
                      width: 950,
                      height: 300}
        };
  

  public hide(event) {
      this.view_chart_Vehicle_Engine_RPM = false;
      this.view_chart_Vehicle_MAF = false;
      this.view_chart_Vehicle_MAP = false;
      this.view_chart_Intake_Air_Temp = false;
      this.view_chart_Abs_Throttle_Pos = false;
      this.view_chart_Abs_Acc_Pedal_Pos = false;
      this.view_chart_Veh_Pos_Long = false;
      this.view_chart_Veh_Pos_Latt = false;
      this.view_chart_Engine_Load = false;
      this.view_chart_Engine_Retarder_Torque = false;
      
      this.view_table = true;
  }

}

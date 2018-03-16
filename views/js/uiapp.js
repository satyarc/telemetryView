/**
 * http://usejsdoc.org/
 */
var app = angular.module("telemetryApp", []); 
app.controller("telemetryController", function($scope) {
	$scope.devices = [	{"name":"RASPBERRY PI DEMO DEVICE",
							"data":"ND"},
						{"name":"DHT11 DEMO DEVICE",
							"data":"ND"},
						{"name":"TEST DEVICE A1",
							"data":"ND"},
						{"name":"TEST DEVICE A2",
							"data":"ND"}];
	
	$scope.displayForms = ["VIEW1       ","VIEW2     ","VIEW3     "];
	
	$scope.onDeviceSelect = function(deviceSelected){
		$scope.selectedDevice = deviceSelected.name;
	}
	
	$scope.onDisplaySelect = function(display){
		$scope.selectedDisplay = display;
	}
});


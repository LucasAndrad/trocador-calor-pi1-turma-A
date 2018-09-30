var sensor1_1 = '{"temperature":52.1,"sensor_id":1,"date":"2018-09-24T00:00:20.107936Z"}'
var sensor2_1 = '{"temperature":72.9,"sensor_id":2,"date":"2018-09-24T00:00:27.577078Z"}'
var sensor3_1 = '{"temperature":90.0,"sensor_id":3,"date":"2018-09-24T00:00:34.528220Z"}'
var sensor4_1 = '{"temperature":99.9,"sensor_id":4,"date":"2018-09-24T00:00:41.388013Z"}'

var sensor1_2 = '{"temperature":72.9,"sensor_id":1,"date":"2018-09-24T00:00:20.107936Z"}'
var sensor2_2 = '{"temperature":52.1,"sensor_id":2,"date":"2018-09-24T00:00:27.577078Z"}'
var sensor3_2 = '{"temperature":99.9,"sensor_id":3,"date":"2018-09-24T00:00:34.528220Z"}'
var sensor4_2 = '{"temperature":90.0,"sensor_id":4,"date":"2018-09-24T00:00:41.388013Z"}'

var sensor1_3 = '{"temperature":99.9,"sensor_id":1,"date":"2018-09-24T00:00:20.107936Z"}'
var sensor2_3 = '{"temperature":90.0,"sensor_id":2,"date":"2018-09-24T00:00:27.577078Z"}'
var sensor3_3 = '{"temperature":72.9,"sensor_id":3,"date":"2018-09-24T00:00:34.528220Z"}'
var sensor4_3 = '{"temperature":52.1,"sensor_id":4,"date":"2018-09-24T00:00:41.388013Z"}'

var obj1 = JSON.parse(sensor1_1);
var obj2 = JSON.parse(sensor2_1);
var obj3 = JSON.parse(sensor3_1);
var obj4 = JSON.parse(sensor4_1);

var obj5 = JSON.parse(sensor1_2);
var obj6 = JSON.parse(sensor2_2);
var obj7 = JSON.parse(sensor3_2);
var obj8 = JSON.parse(sensor4_2);

var obj9 = JSON.parse(sensor1_3);
var obj10 = JSON.parse(sensor2_3);
var obj11 = JSON.parse(sensor3_3);
var obj12 = JSON.parse(sensor4_3);

document.getElementById("temperature1").innerHTML = obj1.temperature;
document.getElementById("temperature2").innerHTML = obj2.temperature;
document.getElementById("temperature3").innerHTML = obj3.temperature;
document.getElementById("temperature4").innerHTML = obj4.temperature;
document.getElementById("temperature5").innerHTML = obj5.temperature;
document.getElementById("temperature6").innerHTML = obj6.temperature;
document.getElementById("temperature7").innerHTML = obj7.temperature;
document.getElementById("temperature8").innerHTML = obj8.temperature;
document.getElementById("temperature9").innerHTML = obj9.temperature;
document.getElementById("temperature10").innerHTML = obj10.temperature;
document.getElementById("temperature11").innerHTML = obj11.temperature;
document.getElementById("temperature12").innerHTML = obj12.temperature;

var temperaturesOfS1 = [obj1.temperature, obj5.temperature, obj9.temperature]
var temperaturesOfS2 = [obj2.temperature, obj6.temperature, obj10.temperature]
var temperaturesOfS3 = [obj3.temperature, obj7.temperature, obj11.temperature]
var temperaturesOfS4 = [obj4.temperature, obj8.temperature, obj12.temperature]

function calculateLinesOfTable(){
  var table = document.getElementById('temperatureTable');
  var totalOflines = table.getElementsByTagName('tr');
  var lines = totalOflines.length - 2;

  return lines;
}

function calculateMedia(list){
  var valorSoma = 0, arraySoma = [];
  for(var i = 0; i < list.length; i++){
    arraySoma[i] = parseFloat(list[i].value);
    valorSoma += parseFloat(list[i]);
  }
  var media = (valorSoma/calculateLinesOfTable()).toFixed(2);

  return media;
}

document.getElementById("media1").innerHTML = calculateMedia(temperaturesOfS1);
document.getElementById("media2").innerHTML = calculateMedia(temperaturesOfS2);
document.getElementById("media3").innerHTML = calculateMedia(temperaturesOfS3);
document.getElementById("media4").innerHTML = calculateMedia(temperaturesOfS4);

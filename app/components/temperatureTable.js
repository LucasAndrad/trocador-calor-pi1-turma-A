var sensor1 = '{"temperature":52.1,"sensor_id":1,"date":"2018-09-24T00:00:20.107936Z"}'
var sensor2 = '{"temperature":72.9,"sensor_id":2,"date":"2018-09-24T00:00:27.577078Z"}'
var sensor3 = '{"temperature":90.0,"sensor_id":3,"date":"2018-09-24T00:00:34.528220Z"}'
var sensor4 = '{"temperature":99.9,"sensor_id":4,"date":"2018-09-24T00:00:41.388013Z"}'

var obj1 = JSON.parse(sensor1);
var obj2 = JSON.parse(sensor2);
var obj3 = JSON.parse(sensor3);
var obj4 = JSON.parse(sensor4);

document.getElementById("temperature1").innerHTML = obj1.temperature;
document.getElementById("temperature2").innerHTML = obj2.temperature;
document.getElementById("temperature3").innerHTML = obj3.temperature;
document.getElementById("temperature4").innerHTML = obj4.temperature;


function calculateLinesOfTable(){
  var table = document.getElementById('temperatureTable');
  var totalOflines = table.getElementsByTagName('tr');
  var lines = totalOflines.length - 2;

  return lines;
}

function calculateMedia(obj){
  var media = (obj.temperature)/(calculateLinesOfTable());

  return media;
}

document.getElementById("media1").innerHTML = calculateMedia(obj1);
document.getElementById("media2").innerHTML = calculateMedia(obj2);
document.getElementById("media3").innerHTML = calculateMedia(obj3);
document.getElementById("media4").innerHTML = calculateMedia(obj4);

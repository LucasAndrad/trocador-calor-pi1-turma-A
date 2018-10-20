// We will not use jquery
// See the second answer to lear how to read data from .json file with JS
// https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript

function getSensorsDatas(){
  document.getElementById("s-temperature1").innerHTML = 0;
  document.getElementById("s-temperature2").innerHTML = 0;
  document.getElementById("s-temperature3").innerHTML = 0;
  document.getElementById("s-temperature4").innerHTML = 0;

  var SerialPort = require('serialport');
  var Readline = SerialPort.parsers.Readline
  var port = new SerialPort('/dev/ttyACM0',{
    baudRate: 9600,
  });

  var parser = new Readline()
  port.pipe(parser)

  parser.on('data', function (data) {
    console.log(data)
  })
}

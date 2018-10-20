// We will not use jquery
// See the second answer to lear how to read data from .json file with JS
// https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript

function getSensorsDatas(){
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

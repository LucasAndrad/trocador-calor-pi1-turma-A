// We will not use jquery
// See the second answer to lear how to read data from .json file with JS
// https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript

  var SerialPort = require('serialport');
  var port = new SerialPort('/dev/ttyACM0',{
    baudRate: 9600,
  });

  port.on('open', onOpen);
  port.on('data', onData);

  function onOpen(){
    console.log('Open Conection')
  }

  function onData(data){
    console.log(data.toString());
  }

function getSensorsDatas(){
  // Default values
  document.getElementById("s-temperature1").innerHTML = 0;
  document.getElementById("s-temperature2").innerHTML = 0;
  document.getElementById("s-temperature3").innerHTML = 0;
  document.getElementById("s-temperature4").innerHTML = 0;
  document.getElementById("s-temperature5").innerHTML = 0;

  // Making communication with Serial Port
  var SerialPort = require('serialport');
  var Readline = SerialPort.parsers.Readline
  // '/dev/ttyACM0' is the port for arduino
  var port = new SerialPort('/dev/ttyACM0',{
    // Same rate as arduino
    baudRate: 9600,
  });

  // Adding parse so it gets full line instead of parts
  var parser = new Readline()
  port.pipe(parser)

  // Aux variable to know if last data was serial number or temperature
  var lastData;

  // Getting data from serial port
  parser.on('data', function (data) {
    var parsed_data = parseFloat(data);

    // If data is float
    // Data.legth is used because sometimes it was getting unwanted values from serial number
    if (parsed_data != NaN && data.length < 10){
      if (lastData == "D7"){
        document.getElementById("s-temperature1").innerHTML = data;
      }
      else if (lastData == "F5"){
        document.getElementById("s-temperature2").innerHTML = data;
      }
      else if (lastData == "C3"){
        document.getElementById("s-temperature3").innerHTML = data;
      }
      else if (lastData == "9C"){
        document.getElementById("s-temperature4").innerHTML = data;
      }
      else if (lastData == "9E"){
        document.getElementById("s-temperature5").innerHTML = data;
      }
    }

    // Trying to get last 2 digits of data
    if(data.length >= 3){
      lastData = data[data.length - 3] + data[data.length - 2];
    }
  })
}

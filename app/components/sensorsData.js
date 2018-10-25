const {dialog} = require('electron').remote

// Making communication with Serial Port
var SerialPort = require('serialport');
var Readline = SerialPort.parsers.Readline
// '/dev/ttyACM0' is the port for arduino
var path = '/tmp/ttyV0' // '/tmp/ttyV0' for data simulation
var port = new SerialPort(path, { autoOpen: false, baudRate: 9600 });

function stopSensorsDatas() {
  port.close();
}

function startButtonHolder() {
  return 0;
}

async function getSensorsDatas() {
  port.open(function (err) {
    if (err) {
      return console.log('Error opening port: ', err.message);
    }
  });
  // If it starts communication desactivate button
  port.on('open', function(err) {
    document.getElementById('start-sensors-button').setAttribute( "onclick", "startButtonHolder()" );
  });

  // Sleep 200ms to get real result of port.isOpen
  await sleep(200);

  // Give alert if fail to connect
  if(!port.isOpen){
    const dialogOptions = {title: 'Erro de comunicação', type: 'info', buttons: ['OK'], message: 'Não foi possível realizar a conexão com o sensor.\nVerifique se o mesmo está conectado e tente novamente.'}
    dialog.showMessageBox(dialogOptions)
  }

  port.on('close', function (err) {
    // If communication breaks reactivate button
    document.getElementById('start-sensors-button').setAttribute( "onclick", "getSensorsDatas()" );

    const dialogOptions = {title: 'Comunicação encerrada.', type: 'info', buttons: ['OK'], message: 'A comunicação foi encerrada.\n'}
    dialog.showMessageBox(dialogOptions)
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

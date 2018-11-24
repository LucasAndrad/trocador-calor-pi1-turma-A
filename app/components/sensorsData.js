const {
  dialog
} = require('electron').remote

// Making communication with Serial Port
var SerialPort = require('serialport');
var Readline = SerialPort.parsers.Readline
// '/dev/ttyACM0' is the port for arduino
var path = '/tmp/ttyV0' // '/tmp/ttyV0' for data simulation
var port = new SerialPort(path, {
  autoOpen: false,
  baudRate: 9600
});

function stopSensorsDatas() {
  port.write('@');
  port.close();
}

function startButtonHolder() {
  return 0;
}

var nextSensorData = [0, 0, 0, 0, 0, 0]

async function getSensorsDatas() {
  port.open(function (err) {
    if (err) {
      return console.log('Error opening port: ', err.message);
    }
  });
  // If it starts communication desactivate button
  port.on('open', function (err) {
    port.write('!');
    document.getElementById('start-sensors-button').setAttribute("onclick", "startButtonHolder()");
  });

  // Sleep 200ms to get real result of port.isOpen
  await sleep(200);

  // Give alert if fail to connect
  if (!port.isOpen) {
    const dialogOptions = {
      title: 'Erro de comunicação',
      type: 'info',
      buttons: ['OK'],
      message: 'Não foi possível realizar a conexão com o sensor.\nVerifique se o mesmo está conectado e tente novamente.'
    }
    dialog.showMessageBox(dialogOptions)
  }

  var alreadyClosed = false;
  port.on('close', function (err) {
    if (!alreadyClosed) {
      // If communication breaks reactivate button
      document.getElementById('start-sensors-button').setAttribute("onclick", "getSensorsDatas()");

      const dialogOptions = {
        title: 'Comunicação encerrada.',
        type: 'info',
        buttons: ['OK'],
        message: 'A comunicação foi encerrada.\n'
      }
      dialog.showMessageBox(dialogOptions)
    }
    alreadyClosed = true;
  });

  // Adding parse so it gets full line instead of parts
  var parser = new Readline()
  port.pipe(parser)

  // Aux variable to know if last data was serial number or temperature
  var lastData;

  // Getting data from serial port
  parser.on('data', function (data) {
    var parsed_data = parseFloat(data);

    // If data is numeric
    if (typeof data != typeof NaN && data.length < 8) {
      if (lastData == "D7") {
        document.getElementById("s-temperature1").innerHTML = data;
        nextSensorData[0] = parsed_data
        updateChart(nextSensorData);
        updateBasicInfo(nextSensorData);
      } else if (lastData == "F5") {
        document.getElementById("s-temperature2").innerHTML = data;
        nextSensorData[1] = parsed_data
      } else if (lastData == "C3") {
        document.getElementById("s-temperature3").innerHTML = data;
        nextSensorData[2] = parsed_data
      } else if (lastData == "9C") {
        checkStatus(data);
        document.getElementById("s-temperature4").innerHTML = data;
        nextSensorData[3] = parsed_data
      } else if (lastData =="mc"){ //sensor de fluxo frio
        checkStatus(data);
        document.getElementById("s-flowMc").innerHTML = data;
        nextSensorData[4] = parsed_data
      } else if (lastData == "mh"){ //sensor de fluxo quente
        checkStatus(data);
        document.getElementById("s-flowMh").innerHTML = data;
        nextSensorData[5] = parsed_data
      }

    }

    // Trying to get last 2 digits of data
    if (data.length >= 3) {
      lastData = data[data.length - 3] + data[data.length - 2];
    }
  })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

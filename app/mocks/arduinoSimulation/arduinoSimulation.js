arduino_simulation();

async function arduino_simulation(){
  var SerialPort = require('serialport');
  var port = new SerialPort('/tmp/ttyV1');

  for (var i=0; i<5; i++){
    var temperature;
    switch (i) {
      case 0:
        await sleep(250);
        port.write('28 AA AA 3E 13 13 2 F5 \n');
        temperature = generateRandomNumber(20 , 25);
        await sleep(250);
        port.write(temperature);
        break;
      case 1:
        await sleep(250);
        port.write('28 AA 81 EE 12 13 2 D7 \n');
        temperature = generateRandomNumber(30 , 35);
        await sleep(250);
        port.write(temperature);
        break;
      case 2:
        await sleep(250);
        port.write('28 59 DD 92 1B 13 1 9E \n');
        temperature = generateRandomNumber(40 , 45);
        await sleep(250);
        port.write(temperature);
        break;
      case 3:
        await sleep(250);
        port.write('28 D C7 84 1B 13 1 9C \n');
        temperature = generateRandomNumber(50 , 62);
        await sleep(250);
        port.write(temperature);
        break;
      case 4:
        await sleep(250);
        port.write('28 2F 99 97 1B 13 1 C3 \n');
        temperature = generateRandomNumber(60 , 65);
        await sleep(250);
        port.write(temperature);
        break;
    }
  }
}

function generateRandomNumber(min_value , max_value){
  var random = Math.random() * (max_value-min_value) + min_value;
  var round = parseFloat(random.toFixed(2));
  var result = round.toString()+'\n';
  return result;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

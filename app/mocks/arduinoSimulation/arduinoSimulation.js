arduino_simulation();

async function arduino_simulation(){
  var SerialPort = require('serialport');
  var port = new SerialPort('/tmp/ttyV1');

  // sersor legend
  // 1 = D7 -> 73 : 78
  // 2 = F5 -> 27 : 29  
  // 3 = 9C -> 70 : 73
  // 4 = C3 -> 24 : 27
  for (var i=0; i<5; i++){
    var temperature;
    switch (i) {
      case 0:
        await sleep(250);
        port.write('28 AA AA 3E 13 13 2 F5 \n');
        await sleep(50);
        temperature = generateRandomNumber(27 , 29);
        port.write(temperature);
        await sleep(50);
        flux = generateRandomNumber(1 , 5);
        port.write(flux);
        await sleep(50);
        flux = generateRandomNumber(1 , 5);
        port.write(flux);
        break;
      case 1:
        await sleep(250);
        port.write('28 AA 81 EE 12 13 2 D7 \n');
        temperature = generateRandomNumber(73 , 78);
        port.write(temperature);
        await sleep(50);
        flux = generateRandomNumber(1 , 5);
        port.write(flux);
        await sleep(50);
        flux = generateRandomNumber(1 , 5);
        port.write(flux);
        break;
      case 2:
        await sleep(250);
        port.write('28 59 DD 92 1B 13 1 9E \n');
        temperature = generateRandomNumber(40 , 45);
        port.write(temperature);
        await sleep(50);
        flux = generateRandomNumber(1 , 5);
        port.write(flux);
        await sleep(50);
        flux = generateRandomNumber(1 , 5);
        port.write(flux);
        break;
      case 3:
        await sleep(250);
        port.write('28 D C7 84 1B 13 1 9C \n');
        temperature = generateRandomNumber(70 , 73);
        port.write(temperature);
        await sleep(50);
        flux = generateRandomNumber(1 , 5);
        port.write(flux);
        await sleep(50);
        flux = generateRandomNumber(1 , 5);
        port.write(flux);
        break;
      case 4:
        await sleep(250);
        port.write('28 2F 99 97 1B 13 1 C3 \n');
        temperature = generateRandomNumber(24 , 27);
        port.write(temperature);
        await sleep(50);
        flux = generateRandomNumber(1 , 5);
        port.write(flux);
        await sleep(50);
        flux = generateRandomNumber(1 , 5);
        port.write(flux);
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

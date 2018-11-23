// function from https://stackoverflow.com/questions/6449611/check-whether-a-value-is-a-number-in-javascript-or-jquery
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function updateBasicInfo(data) {
  var mhBasicInfo = 0.139;
  var mcBasicInfo = 0.653;
  var th2InitialBasicInfo = 31.07567262
  tpdBasicInfo = tubesPressureDrop(data[2], data[3], data[4]); //mh = data[4]
  if(isNumber(tpdBasicInfo)) {
    document.getElementById("basicInfoTubesPressure").innerHTML = tpdBasicInfo.toFixed(4);
  }

  // Legenda muito importante
  // tc1 = Temp agua fria de entrada --- reposta sensor 3 = data 2
  // tc2 = Temp agua quente de saida --- reposta sensor 4 = data 3
  // th1 = Temp agua quente de entrada --- reposta sensor 2 data 1
  // th2InitialBasicInfo =  Temp agua quente de saida especulada
  // Descobrir sensor de fluxo da água fria
  // Descobrir sensor de fluxo da água quente

  fhwt = finalHotWaterTemperature(data[2], data[3], data[1], th2InitialBasicInfo, data[5], data[4]);

  hpdBasicInfo = hullPressureDrop(data[2], data[3], data[1], fhwt, data[5]); //mg = data[5]
  document.getElementById("basicInfoHullPressure").innerHTML = hpdBasicInfo.toFixed(4);

  tpBasicInfo = thermalPerformance(data[2], data[3], data[1], fhwt);
  document.getElementById("basicInfoThermalPerformance").innerHTML = tpBasicInfo.toFixed(4);
}
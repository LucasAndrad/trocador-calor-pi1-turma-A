// function from https://stackoverflow.com/questions/6449611/check-whether-a-value-is-a-number-in-javascript-or-jquery
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function updateBasicInfo(data) {
  var mhBasicInfo = 0.139;
  var mcBasicInfo = 0.653;
  var th2InitialBasicInfo = 31.07567262;
  tpdBasicInfo = tubesPressureDrop(data[2], data[3], mhBasicInfo); //mh = data[4]
  if(isNumber(tpdBasicInfo)) {
    document.getElementById("basicInfoTubesPressure").innerHTML = tpdBasicInfo.toFixed(4);
  }

  // Legenda muito importante
  // tc1 = Temp agua fria de entrada --- reposta sensor 3 = data 2
  // tc2 = Temp agua quente de saida --- reposta sensor 4 = data 3
  // th1 = Temp agua quente de entrada --- reposta sensor 2 data 1
  // th2InitialBasicInfo =  Temp agua quente de saida especulada
  // Uma coisa que não faz sentido: a temperatura da água quente não é conhecida, já que há um sensor
  // para medi-la?
  // Descobrir sensor de fluxo da água fria
  // Descobrir sensor de fluxo da água quente

  cpc = calculateCPC (data[2], data[3]);
  cph = calculateCPH (data[1], th2InitialBasicInfo);
  qc = heatTransferRate (mcBasicInfo, data[3], data[2], cpc);
  th2 = calculateTh2 (data[1], qc, mhBasicInfo, cph);
  qh = coldTransferRate (mhBasicInfo, th2, data[1], cph)
  fhwt = finalHotWaterTemperature(data[2], data[3], data[1], th2InitialBasicInfo, mcBasicInfo, mhBasicInfo);

  hpdBasicInfo = hullPressureDrop(data[2], data[3], data[1], fhwt, mcBasicInfo); //mc = data[5]
  document.getElementById("basicInfoHullPressure").innerHTML = hpdBasicInfo.toFixed(4);

  tpBasicInfo = thermalPerformance(data[2], data[3], data[1], fhwt, mhBasicInfo);
  document.getElementById("basicInfoThermalPerformance").innerHTML = tpBasicInfo.toFixed(4);

  document.getElementById("basicInfoHeatTransferRate").innerHTML = qc.toFixed(4);
  document.getElementById("basicInfoColdTransferRate").innerHTML = qh.toFixed(4);
  console.log("TH2 em Tempo Real = "+th2);
  

}
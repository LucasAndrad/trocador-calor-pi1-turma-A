function updateBasicInfo(data) {
  var mhBasicInfo = 0.139;
  var th2InitialBasicInfo = 31.07567262
  tpdBasicInfo = tubesPressureDrop(data[0], data[3], mhBasicInfo);
  document.getElementById("basicInfoTubesPressure").innerHTML = tpdBasicInfo.toFixed(4);

  // Perguntar quais são os repectivos sensores
  // tc1 = data[0] = Temp agua fria de entrada --- sensor 3 = data 2
  // tc2 = data[3] = Temp agua quente de saida --- sensor 4 = data 3
  // th1 = data[1] = Temp agua quente de entrada --- sensor 2 data 1
  // th2InitialBasicInfo =  Temp agua quente de saida especulada

  hpdBasicInfo = hullPressureDrop(data[2], data[3], data[1], th2InitialBasicInfo, mhBasicInfo);
  document.getElementById("basicInfoHullPressure").innerHTML = hpdBasicInfo.toFixed(4);

  tpBasicInfo = thermalPerformance(data[2], data[3], data[1], th2InitialBasicInfo);
  document.getElementById("basicInfoThermalPerformance").innerHTML = tpBasicInfo.toFixed(4);
}
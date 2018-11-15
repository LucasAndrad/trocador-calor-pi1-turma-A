function updateBasicInfo(data) {
  var mhBasicInfo = 0.139;
  var th2InitialBasicInfo = 31.07567262
  tpdBasicInfo = tubesPressureDrop(mhBasicInfo);
  document.getElementById("basicInfoTubesPressure").innerHTML = tpdBasicInfo.toFixed(4);

  // Perguntar quais são os repectivos sensores
  // tc1 = data[0] = Temp agua fria de entrada
  // tc2 = data[3] = Temp agua quente de saida
  // th1 = data[1] = Temp agua quente de entrada
  // th2InitialBasicInfo =  Temp agua quente de saida especulada

  hpdBasicInfo = hullPressureDrop(data[0], data[3], data[1], th2InitialBasicInfo, mhBasicInfo);
  document.getElementById("basicInfoHullPressure").innerHTML = hpdBasicInfo.toFixed(4);

  tpBasicInfo = thermalPerformance(data[0], data[3], data[1], th2InitialBasicInfo);
  document.getElementById("basicInfoThermalPerformance").innerHTML = tpBasicInfo.toFixed(4);
}
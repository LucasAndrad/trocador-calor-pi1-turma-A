function updateBasicInfo(data) {
  var mhBasicInfo = 0.139;
  tpdBasicInfo = tubesPressureDrop(mhBasicInfo);
  document.getElementById("basicInfoTubesPressure").innerHTML = tpdBasicInfo.toFixed(6);

  hpdBasicInfo = hullPressureDrop(data[0], data[3], data[1], 31.07567262, mhBasicInfo);
  document.getElementById("basicInfoHullPressure").innerHTML = hpdBasicInfo.toFixed(6);
}
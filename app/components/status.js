function checkStatus(temperatureSensor4) {
  var max_temp = 80;
  if(temperatureSensor4 <= max_temp) {
    document.getElementById("sta").style.background ="#01DF01";
    document.getElementById("sta").style.animationName="null";
    document.getElementById("sta").innerHTML = "STATUS: OK";
  }
  else {
    document.getElementById("sta").style.background ="#FE2E2E";
    document.getElementById("sta").style.animationName="alert";
    document.getElementById("sta").innerHTML = "STATUS: ALERTA";
  }
}

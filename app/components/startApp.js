function startApp(){
  // Default values for sensors temperatures
  document.getElementById("s-temperature1").innerHTML = 0.0;
  document.getElementById("s-temperature2").innerHTML = 0.0;
  document.getElementById("s-temperature3").innerHTML = 0.0;
  document.getElementById("s-temperature4").innerHTML = 0.0;
  document.getElementById("s-flowMc").innerHTML = 0.0;
  document.getElementById("s-flowMh").innerHTML = 0.0;

  // Just to be sure it will come with right function
  document.getElementById('start-sensors-button').setAttribute( "onclick", "getSensorsDatas()" );
}

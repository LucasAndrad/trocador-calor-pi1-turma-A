var max_temp = 60;
var input = document.getElementById("leitura");
input.addEventListener("input",function() {
  if(input.value <= max_temp) {
    document.getElementById("sta").style.background ="#01DF01";
    document.getElementById("sta").style.animationName="null";
    document.getElementById("sta").innerHTML = "STATUS: OK";
  }
  else {
    document.getElementById("sta").style.background ="#FE2E2E";
    document.getElementById("sta").style.animationName="alert";
    document.getElementById("sta").innerHTML = "STATUS: ALERTA";
  }
});

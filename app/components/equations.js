function Interpolizer (a, b, c, d, e) {
  x = d + (((e - a) * (c - d)) / (b - a));
  return x;
}

function celsiusToKelvin (celsius) {
  temperatureKelvin = parseFloat(273.15) + parseFloat(celsius);
  return temperatureKelvin;
}

function kelvinToCelsius (kelvin) {
  temperatureCelsius = kelvin - 273.15;
  return temperatureCelsius;
}

function convertLminToKgs (flow) {
  var fKgs;
  fKgs = 0.017 * flow;
  return fKgs;
}

function readTableTPSW (cpc) {
  var cph;
  var previous;
  var posterior;
  var temperaturePrevious;
  var temperaturePosterior;

  for (i = 0; i < tableOfTPSW.length; i++) {
    if (cpc == tableOfTPSW[i].temperature) {
      cph = tableOfTPSW[i].cpf;
      return cph;
    } else if (cpc < tableOfTPSW[i].temperature) {
      temperaturePrevious = i>0 ? tableOfTPSW[i - 1].temperature : 330;
      temperaturePosterior = tableOfTPSW[i + 1].temperature;
      previous = i>0 ? tableOfTPSW[i - 1].cpf : 4.184;
      posterior = tableOfTPSW[i].cpf;
      cph = Interpolizer(temperaturePrevious, temperaturePosterior, posterior, previous, cpc);
      return cph;
    }
  }
}

function readTableB2 (tw) {
  var uw;
  var previous;
  var posterior;
  var temperaturePrevious;
  var temperaturePosterior;

  for (i = 0; i < tableB2.length; i++) {
    if (tw == tableB2[i].temperature) {
      uw = tableB2[i].mi;
      return uw;
    } else if (tw < tableB2[i].temperature) {
      temperaturePrevious = i>0 ? tableB2[i - 1].temperature : 497.09;
      temperaturePosterior = tableB2[i + 1].temperature;
      previous = i>0 ? tableB2[i - 1].mi : 0.1648;
      posterior = tableB2[i].mi;
      uw = Interpolizer(temperaturePrevious, temperaturePosterior, posterior, previous, tw);
      console.log("anterior = " + previous);
      console.log("posterior = " + posterior);
      return uw;
    }
  }
}

function readTableA9 (arithmeticMeanTh) {
  var ub;
  var previous;
  var posterior;
  var temperaturePrevious;
  var temperaturePosterior;

  for (i = 0; i < tableTPSIWS.length; i++) {
    if (arithmeticMeanTh == tableTPSIWS[i].temperature) {
      ub = tableTPSIWS[i].mi;
      return ub;
    } else if (arithmeticMeanTh < tableTPSIWS[i].temperature) {
      temperaturePrevious = i>0 ? tableTPSIWS[i - 1].temperature : 1;
      temperaturePosterior = tableTPSIWS[i + 1].temperature;
      previous = i>0 ? tableTPSIWS[i - 1].mi : 1;
      posterior = tableTPSIWS[i].mi;
      ub = Interpolizer(temperaturePrevious, temperaturePosterior, posterior, previous, arithmeticMeanTh);
      console.log("anterior = " + previous);
      console.log("posterior = " + posterior);
      return ub;
    }
  }
}


function heatTransferRate (mc, tc2, tc1, cpc) {
  qc = mc * cpc * (tc2 - tc1);
  return qc;
}

function coldTransferRate (mh, th2, th1, cph) {
  qh = mh * cph * (th2 - th1);
  return qh;
}


function finalHotWaterTemperature (tc1, tc2, th1, th2Initial, mh, mc) {
  var cph, cpc;

  arithmeticMeanTc = ((parseFloat(tc1) + parseFloat(tc2)) / 2); //Temperatura média da agua fria
  arithmeticMeanTh = ((parseFloat(th1) + parseFloat(th2Initial)) / 2); //Temperatura média da agua quente
  cpc = celsiusToKelvin(arithmeticMeanTc);
  cpc = readTableTPSW(cpc);
  cph = celsiusToKelvin(arithmeticMeanTh); //Temperatura em Kelvin
  cph = readTableTPSW(cph);

  qc = heatTransferRate(mc, tc2, tc1, cpc);
  console.log("cph = " + cph);
  console.log("cpc = " + cpc);
  temp = ((qc / (mh * cph)));
  th2 = th1 - temp;
  var roundedTh2 = parseFloat(th2.toFixed(4));
  var qh = coldTransferRate(mh, th2, th1, cph);
  console.log("qh = " + qh);
  document.getElementById("initialTemperature").innerHTML = th1;
  document.getElementById("th2").innerHTML = roundedTh2;
  return roundedTh2;
}

function tubesPressureDrop (tc1, tc2, mh) {
  var f; //coeficiente de atrito
  var Lc = 0.98; //Comprimento do tubo de cobre em metros
  var np = 1; //Número de passes
  var di = 0.00757; //Diâmetros interno dos tubos
  var ro = 974.8; //Em kg/m^3
  var Um; //Velocidade média dentro dos tubos
  var atp;
  var nt = 27; //Número de tubos de cobre
 
  arithmeticMeanTc = ((parseFloat(tc1) + parseFloat(tc2))/2); //Temperatura média da agua fria
  mi = readTableA9(arithmeticMeanTc);
  Re = (4*mh)/((nt/np)*Math.PI*mi*di)* 1000;
  f = Math.pow((1.58 * Math.log(Re) - 3.28), (-2));
  console.log("f = ", f);
  atp = ((Math.PI * Math.pow(di, 2)) / 4) * (nt / 1);

  Um = mh / (ro * atp);
  Dpt = (parseFloat((4 * f) * ((Lc * np) / di)) + parseFloat(4 * np)) * ro * ((Math.pow(Um, 2) / 2));
  console.log("atp = " + atp);
  console.log("Um = " + Um);
  console.log("Dpt = " + Dpt);
  return Dpt;
}

// function frictionFactor(tc1, tc2, mh){
//     var f;
//     var Re;
//     var di = 0.00757;

//     arithmeticMeanTc = ((parseFloat(tc1) + parseFloat(tc2))/2); //Temperatura média da agua fria
//     mi = readTableA9(arithmeticMeanTc);
//     Re = (4*mh)/((Nt/Np)*Math.PI*mi*di);
//     f = Math.pow((1.58 * Math.LN10(Re) - 3.28),(-2));
//     return f;
// }

function hullPressureDrop (tc1, tc2, th1, th2, mh) {
  var f; //fator de atrito
  var ro = 974.8; //Em kg/m^3
  var De = 0.036056; //Diâmetro equivalente aparente
  var phi; //Tabela A9
  var ub; //Interpolar na Tabela A9
  var uw; //Interpolar na Tabela B2
  var twCelsius;
  var auxUw;
  var As; //Área de seção transversal
  var Gsh; // Velocidade mássica aparente da água quente
  var Ds; // Diâmetro do casco
  var C; // Espaçamento entre as paredes externas dos tubos
  var B; // Espaçamento entre as chicanas
  var Pt = 0.02; // Pitch
  var Do = 0.00965; //Diâmetro externo
  var Nc = 5; //Número de chicanas
  var L = 0.98; //Comprimento útil do tubo de cobre da troca de calor
  var CL = 0.87; // Constante do layout do tubo 
  var CTP = 0.93; // Constante da contagem de tubos para 1 passe
  var A; // Área de troca de calor
  var PR; // Razão dos passos do tubo em relação ao diâmetro externo
  var Nt = 27; // Número de tubos
  var Np = 1;
  var di = 0.00757; // Diâmetro interno 

  twCelsius = 0.5 * (parseFloat((parseFloat(tc1) + parseFloat(tc2)) / 2) + parseFloat((parseFloat(th1) + parseFloat(th2)) / 2));
  console.log("twCelsius = " + twCelsius);
  tw = celsiusToKelvin(twCelsius);
  console.log("tw = " + tw);
  auxUw = readTableB2(tw);
  uw = auxUw * Math.pow(10, (-1));
  console.log("uw = " + uw);

  arithmeticMeanTh = ((parseFloat(th1) + parseFloat(th2)) / 2); //Temperatura média da agua quente
  ub = readTableA9(arithmeticMeanTh);
  console.log("ub = " + ub);

  arithmeticMeanTc = ((parseFloat(tc1) + parseFloat(tc2)) / 2); //Temperatura média da agua fria
  mi = readTableA9(arithmeticMeanTc);
  console.log("mi = " + mi);
  Re = ((4 * mh) / ((Nt / Np) * Math.PI * mi * di)) * 1000;
  console.log("Re = " + Re);
  f = Math.pow((1.58 * Math.log(Re) - 3.28), (-2));
  console.log("f = " + f);
  phi = Math.pow((ub / uw), 0.14);
  console.log("phi = " + phi);
  B = L / (Nc + 1);
  console.log("B = " + B)
  C = Pt - Do;
  console.log("C = " + C);
  PR = Pt / Do;
  A = Math.PI * Do * Nt * L;
  Ds = (0.637 * (Math.sqrt((CL / CTP)))) * Math.sqrt((A * Math.pow(PR, 2) * Do) / L);
  console.log("Ds = " + Ds);
  As = (Ds * C * B) / Pt;
  console.log("As = " + As);
  Gsh = mh / As;
  console.log("Gsh = " + Gsh);
  Dps = ((f * Math.pow(Gsh, 2)) * (parseFloat(Nc) - parseFloat(1)) * Ds) / (2 * ro * De * phi);
  console.log("Dps = " + Dps);
  return Dps;
}

function thermalPerformance (tc1, tc2, th1, th2) {
  var q, uf, a, Dtml;
  uf = 2266.1767;
  a = 0.786174;
  Dtml = 0;
  Dtml = ((th1 - tc2) - (th2 - tc1)) / Math.log((th1 - tc2) / (th2 - tc1));
  q = uf * a * Dtml;
  if (typeof q === "number") {
    return q;
  }
  else {
    return 0;
  }
}

function calculateValuesOfSimulation () {
  var tc1 = document.getElementById("tc1").value;
  var tc2 = document.getElementById("tc2").value;
  var mc = document.getElementById("mc").value;
  var mh = document.getElementById("mh").value;
  var th1 = document.getElementById("th1").value;
  var th2Initial = document.getElementById("th2Initial").value;
  console.log("TC1 = "+ tc1);
  console.log("TC2 = "+ tc2);
  console.log("Th1 = "+ th1);
  console.log("Th2 = "+ th2Initial);
  console.log("mc = "+ mc);
  console.log("mh = "+ mh);



  fhwt = finalHotWaterTemperature(tc1, tc2, th1, th2Initial, mh, mc);
  tpd = tubesPressureDrop(tc1, tc2, mh);
  hpd = hullPressureDrop(tc1, tc2, th1, th2Initial, mh);
  document.getElementById("tubePressure").innerHTML = tpd.toFixed(6);
  document.getElementById("hullPressure").innerHTML = hpd.toFixed(6);
  tp = thermalPerformance(tc1, tc2, th1, th2Initial);
  document.getElementById("thermalPerformance").innerHTML = tp.toFixed(6);
}

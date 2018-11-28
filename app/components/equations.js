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

function calculateCPC (tc1, tc2) {
  arithmeticMeanTc = ((parseFloat(tc1) + parseFloat(tc2)) / 2); //Temperatura média da agua fria
  cpc = celsiusToKelvin(arithmeticMeanTc);
  cpc = readTableTPSW(cpc);
  return cpc;
}

function calculateCPH (th1, th2Initial) {
  arithmeticMeanTh = ((parseFloat(th1) + parseFloat(th2Initial)) / 2); //Temperatura média da agua quente
  cph = celsiusToKelvin(arithmeticMeanTh); //Temperatura em Kelvin
  cph = readTableTPSW(cph);
  return cph;
}

function heatTransferRate (mc, tc2, tc1, cpc) {
  qc = mc * cpc * (tc2 - tc1);
  return qc;
}

function coldTransferRate (mh, th2, th1, cph) {
  qh = mh * cph * (th2 - th1);
  return qh;
}

function calculateTh2 (th1, qc, mh, cph){
  temp = ((qc / (mh * cph)));
  th2 = th1 - temp;
  var roundedTh2 = parseFloat(th2.toFixed(4));
  return roundedTh2;
}


function finalHotWaterTemperature (tc1, tc2, th1, th2Initial, mh, mc) {
  var cph, cpc;

  cpc = calculateCPC(tc1, tc2);
  cph = calculateCPH(th1, th2Initial);

  qc = heatTransferRate(mc, tc2, tc1, cpc);
  console.log("cph = " + cph);
  console.log("cpc = " + cpc);
  roundedTh2 = calculateTh2 (th1, qc, mh,cph);
  var qh = coldTransferRate(mh, roundedTh2, th1, cph);
  console.log("qh = " + qh);
  document.getElementById("initialTemperature").innerHTML = th1;
  document.getElementById("th2").innerHTML = roundedTh2;
  document.getElementById("coldTransferRate").innerHTML = qc.toFixed(4);
  document.getElementById("heatTransferRate").innerHTML = qh.toFixed(4);
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
  console.log("mh = "+ mh);
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

function thermalPerformance (tc1, tc2, th1, th2, mh) {
  var q, Uf, a, Dtml;
  Uc = 2719.421;
  Uf = 1839.164;
  a = 0.786174;
  var f; //= 0.00560
  Dtml = 0;
  var Nt = 26.46157163; // Número de tubos
  var Np = 1;
  var di = 0.00755; // Diâmetro interno 
  var Pr = 2.072539;
  var k = 0.649; //Não tem no memorial
  var De = 0.036056; 
  var As = 0.00959245074546287;
  var kcf = 0.649;
  var Rfi = 0.000088;
  var Rfo = 0.000088;

  arithmeticMeanTc = ((parseFloat(tc1) + parseFloat(tc2)) / 2); //Temperatura média da agua fria
  auxMi = readTableA9(arithmeticMeanTc);
  mi = auxMi*Math.pow(10,-3);
  console.log("mi interpolado thermal = ", +mi)
  Re = ((4 * mh) / ((Nt / Np) * Math.PI * mi * di));
  console.log("Re = ", Re);
  f = Math.pow((1.58 * Math.log(Re) - 3.28), (-2));
  console.log("f thermalPerformance = " + f);
  Nu = ((f/2)*Re*Pr)/(1.07 + (12.7*Math.pow((f/2),0.5)*(Math.pow(Pr,2/3)-1)));
  console.log("Nu = "+Nu);
  hi = (k*Nu)/di;
  console.log("hi = "+hi)

  twCelsius = 0.5 * (parseFloat((parseFloat(tc1) + parseFloat(tc2)) / 2) + parseFloat((parseFloat(th1) + parseFloat(th2)) / 2));
  tw = celsiusToKelvin(twCelsius);
  auxMiw = readTableB2(tw);
  miw = auxMiw * Math.pow(10, (-1));

  arithmeticMeanTh = ((parseFloat(th1) + parseFloat(th2)) / 2); //Temperatura média da agua quente
  mic = readTableA9(arithmeticMeanTh); 
  cpc = calculateCPC(tc1, tc2);
  Gs = mh / As;
  console.log("Gs = "+Gs);
  ho = (0.36*Math.pow((De*Gs/mic),0.55) * Math.pow((cpc*mic/kcf),1/3) * Math.pow((mic/miw),0.14) * k)/De;
  console.log("ho = "+ho);

  Uc = 1/((d0/di*hi) + (d0*Math.log(d0/di))/(2*km) + (1/ho));
  Uf = 1/Uc + Rfi + Rfo

  Erro = Math.abs(Uf-Ufadm/Ufadm);

  Dtml = ((th1 - tc2) - (th2 - tc1)) / Math.log((th1 - tc2) / (th2 - tc1));
  q = Uf * a * Dtml;
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
  document.getElementById("tubePressure").innerHTML = tpd.toFixed(4);
  document.getElementById("hullPressure").innerHTML = hpd.toFixed(4);
  tp = thermalPerformance(tc1, tc2, th1, th2Initial,mh);
  document.getElementById("thermalPerformance").innerHTML = tp.toFixed(4);
}

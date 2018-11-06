
function Interpolizer(a,b,c,d,e){
    x = d + (((e-a) * (c-d)) / (b-a))
    return x;
}

function heatTransferRate(mc, tc2, tc1, cpc){
    qc = mc * cpc * (tc2 - tc1);
    // console.log("qc = " + qc);
    return qc;
}

function readTableTPSW(cpc){
    var cph;
    var previous;
    var posterior;
    var temperaturePrevious;
    var temperaturePosterior;
    for(i = 0; i < tableOfTPSW.length; i++){
        if(cpc == tableOfTPSW[i].temperature){
            cph = tableOfTPSW[i].cpf;
            return cph;
        }else if(cpc < tableOfTPSW[i].temperature){
            temperaturePrevious = tableOfTPSW[i-1].temperature;
            temperaturePosterior = tableOfTPSW[i+1].temperature;
            previous = tableOfTPSW[i-1].cpf;
            posterior = tableOfTPSW[i].cpf;
            cph = Interpolizer(temperaturePrevious, temperaturePosterior, posterior, previous, cpc);
            // console.log("anterior = " + previous);
            // console.log("posterior = " + posterior);
            return cph;
        }
        // console.log(tableOfTPSW[i].temperature, tableOfTPSW[i].cpf);
    }
}

function celsiusToKelvin(celsius){
    temperatureKelvin = parseFloat(273.15)+parseFloat(celsius);
    return temperatureKelvin;
}

function kelvinToCelsius(kelvin){
    temperatureCelsius = kelvin - 273.15;
    return temperatureCelsius;
}

function calculateValuesOfSimulation(){
    var mh = 0.139; //Vazão da água fria
    var cph, cpc, auxQc;
    var tpd;
    var hpd;
    var tp;
    var tc1 = document.getElementById("tc1").value;
    var tc2 = document.getElementById("tc2").value;
    var mc = document.getElementById("mc").value;
    var th1 = document.getElementById("th1").value;
    var th2Initial = document.getElementById("th2Initial").value;

    arithmeticMeanTc = ((parseFloat(tc1) + parseFloat(tc2))/2); //Temperatura média da agua fria
    arithmeticMeanTh = ((parseFloat(th1) + parseFloat(th2Initial))/2); //Temperatura média da agua quente
    cpc = celsiusToKelvin(arithmeticMeanTc);
    cpc = readTableTPSW(cpc);
    cph = celsiusToKelvin(arithmeticMeanTh); //Temperatura em Kelvin
    cph = readTableTPSW(cph);

    qc = heatTransferRate(mc,tc2,tc1,cpc);
    console.log("cph = " + cph);
    temp = ((qc/(mh*cph)));
    th2 = th1 - temp;
    var roundedTh2 = parseFloat(th2.toFixed(4));
    document.getElementById("initialTemperature").innerHTML = th1;
    document.getElementById("th2").innerHTML = roundedTh2;
    tpd = tubesPressureDrop();
    hpd = hullPressureDrop(tc1,tc2,th1,th2);
    document.getElementById("tubePressure").innerHTML = tpd.toFixed(6);
    document.getElementById("hullPressure").innerHTML = hpd.toFixed(6);
    tp = thermalPerformance(tc1,tc2,th1,th2);
    document.getElementById("thermalPerformance").innerHTML = tp.toFixed(6);
}

function tubesPressureDrop(){
    var f = 0.01644; //coeficiente de atrito
    var Lc = 0.98; //Comprimento do tubo de cobre em metros
    var np = 1; //Número de passes
    var di = 0.00755; //Diâmetros interno dos tubos
    var ro = 974.8; //Em kg/m^3
    var Um; //Velocidade média dentro dos tubos
    var mh = 0.139; //Vazão da água fria
    var atp;
    var nt = 27; //Número de tubos de cobre

    atp = ((Math.PI*Math.pow(di,2))/4) * (nt/1);
    // atp = ((3.14*Math.pow(di,2))/4) * (nt/1);

    Um = mh/(ro*atp);
    Dpt = (parseFloat((4*f)*((Lc*np)/di)) + parseFloat(4*np)) * ro*((Math.pow(Um,2)/2));
    console.log("atp = " + atp);
    console.log("Um = " + Um);
    console.log("Dpt = " + Dpt);
    return Dpt;
}

function readTableTPSIWS(tw){
    var uw;
    var previous;
    var posterior;
    var temperaturePrevious;
    var temperaturePosterior;

    for(i = 0; i < tableTPSIWS.length; i++){
        if(tw == tableTPSIWS[i].temperature){
            uw = tableTPSIWS[i].mi;
            return uw;
        }else if(tw < tableTPSIWS[i].temperature){
            temperaturePrevious = tableTPSIWS[i-1].temperature;
            temperaturePosterior = tableTPSIWS[i+1].temperature;
            previous = tableTPSIWS[i-1].mi;
            posterior = tableTPSIWS[i].mi;
            uw = Interpolizer(temperaturePrevious, temperaturePosterior, posterior, previous, tw);
            console.log("anterior = " + previous);
            console.log("posterior = " + posterior);
            return uw;
        }
    }
}
function hullPressureDrop(tc1,tc2,th1,th2){
    var f = 0.01644; //coeficiente de atrito
    var Gsh = 8.0929; //velocidade mássica aparente
    var nc = 5; //número de chicanas
    var Ds =  0.11234929; //diâmetro externo do casco
    var ro = 974.8; //Em kg/m^3
    var De =  0.036056; //Diâmetro equivalente aparente
    var phi; //Tabela B-2
    var ub = 0.00085;
    var uw; //Tabela B-2
    var twCelsius;
    var auxUw;

    twCelsius = 0.5*(parseFloat((parseFloat(tc1)+parseFloat(tc2))/2) + parseFloat((parseFloat(th1)+parseFloat(th2))/2));
    console.log("twCelsius = "+twCelsius);
    tw = celsiusToKelvin(twCelsius);
    console.log("tw = "+tw);
    auxUw = readTableTPSIWS(tw);
    uw = auxUw * Math.pow(10,(-4));
    console.log("uw = " + uw);
    phi = Math.pow((ub/uw),0.14);
    console.log("phi = "+phi);
    Dps = (f*Math.pow(Gsh,2) * (nc-1)*Ds)/(2*ro*De*phi);
    console.log("Dps = "+Dps);
    /*Provavelmente algum valor que ela passou está errado, porque
      está dando 0,002394758 no software e 0,006863 no memorial de calculos.
      Phi aparenta estar ok.
    */
    return Dps;
}

function thermalPerformance(tc1,tc2,th1,th2){
  var q, uf, a, Dtml;
  uf = 2266.1767;
  a = 0.86159;
  Dtml = ((th1-tc2)-(th2-tc1))/Math.log((th1-tc2)/(th2-tc1));
  q = uf*a*Dtml;

  return q;
}

function convertLminToKgs(flow){
  var fKgs;
  fKgs = 0.017 * flow;
  return fKgs;
}

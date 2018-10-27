function Interpolizer(a,b,c,d,e){
    // var a, b, c, d, e;
    // a = 22; // A é limite inferior
    // b = 27; //B é limite superior
    // c =  4.179; //C é
    // d = 4.181; //D é
    // e = 25; //E é o que quer saber (Entrada)

    x = d + (((e-a) * (c-d)) / (b-a))
    // console.log("Interpolação = " + x);
    return x;
}

function heatTransferRate(mc, tc2, tc1, cpc){
    qc = mc * cpc * (tc2 - tc1);
    console.log("qc = " + qc);
    return qc;
}

function readTableTPSW(cpc){
    var cph;
    var previous;
    var posterior;
    var temperaturePrevious;
    var temperaturePosterior;
    var aux;
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

function readTable(){
    for(i = 0; i < tableOfTPSW.length; i++){
        console.log(tableOfTPSW[i].temperature, tableOfTPSW[i].cpf);
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

function finalHotWaterTemperature(){
    var tc1 = document.getElementById("tc1").value;
    var tc2 = document.getElementById("tc2").value;
    var mc = document.getElementById("mc").value;
    var th1 = document.getElementById("th1").value;
    var mh = 0.139; //Vazão da água fria
    var cph;
    var cpc;
    var auxQc;

    var hotWaterTemperature = document.getElementById('finalHotWaterTemperature');
    mediaTc = ((parseFloat(tc1) + parseFloat(tc2))/2); //Temperatura média da agua fria
    mediaTh = 52; //Temperatura média da agua quente
    cpc = celsiusToKelvin(mediaTc);  
    cpc = readTableTPSW(cpc);
    cph = celsiusToKelvin(mediaTh); //Temperatura em Kelvin 
    cph = readTableTPSW(cph);

    qc = heatTransferRate(mc,tc2,tc1,cpc);
    console.log("cph = " + cph);
    temp = ((qc/(mh*cph)));
    th2 = th1 - temp;
    var arredondado = parseFloat(th2.toFixed(4));
    hotWaterTemperature.style.display = 'block';
    document.getElementById("initialTemperature").innerHTML = th1;
    document.getElementById("th2").innerHTML = arredondado;
    tubesPressureDrop();
}

function tubesPressureDrop(){
    var f = 0.0112; //coeficiente de atrito
    var L = 0.98; //Comprimento do tubo de cobre em metros
    var np = 1; //Número de passes
    var di = 0.00757; //Diâmetros interno dos tubos
    var ro = 974.8; //Em kg/m^3
    var Um; //Velocidade média dentro dos tubos
    var mh = 0.139; //Vazão da água fria
    var atp;
    var nt = 28; //Número de tubos de cobre
    
    atp = ((Math.PI*Math.pow(di,2))/4) * (nt/2);
    Um = mh/(ro*atp);
    Dpt = (parseInt((4*f)*((L*np)/di)) + parseInt(4*np)) * ro*((Math.pow(Um,2)/2));
    console.log("atp = " + atp);
    console.log("Um = " + Um);
    console.log("Dpt = " + Dpt);
}

function hullPressureDrop(){
    var f = 0.0112; //coeficiente de atrito
    var Gsh = 8.1590; //velocidade mássica aparente
    var nc = 5; 
    var Ds =  0.11349; //diâmetro externo do casco
    var ro = 974.8; //Em kg/m^3
    var De =  0.0386; //Diâmetro equivalente aparente
    var phi; //Tabela B-2
    var ub = 0.00085;
    var uw; //Tabela B-2

    phi = Math.pow((ub/uw),0.14);
    Dps = (f*Math.pow(Gsh,2) * (nc-1)*Ds)/2*ro*De*phi;
}
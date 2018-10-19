var tc1 = document.getElementById("tc1").value;
var tc2 = document.getElementById("tc2").value;     
var mc = document.getElementById("mc").value;    
var th1 = document.getElementById("th1").value;        
var mh = document.getElementById("mh").value;    
var cph = document.getElementById("cph").value;    
var cpc = document.getElementById("cpc").value;
var hotWaterTemperature = document.getElementById('finalHotWaterTemperature');

function showsInput(){
    console.log("TC1 = " + tc1);
    console.log("TC2 = " + tc2);
    console.log("mc = " + mc);
    console.log("th1 = " + th1);
    console.log("mh = " + mh);
    console.log("cph = " + cph);
    console.log("cpc = " + cpc);
}

function heatTransferRate(){
    qc = mc * cpc * (tc2 - tc1);
    // console.log("qc = " + qc);
    return qc;
}

function finalHotWaterTemperature(){
    qc = heatTransferRate();
    showsInput();
    console.log("qc = " + qc);
    temp = ((qc/(mh*cph)));
    th2 = th1 - temp;
    console.log("th2 = " + th2);
    var arredondado = parseFloat(th2.toFixed(4));
    hotWaterTemperature.style.display = 'block';
    document.getElementById("initialTemperature").innerHTML = th1;
    document.getElementById("th2").innerHTML = arredondado;
}

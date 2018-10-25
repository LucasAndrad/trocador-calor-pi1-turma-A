function heatTransferRate(mc, tc2, tc1, cpc){
    qc = mc * cpc * (tc2 - tc1);
    console.log("cpc = " + cpc)
    return qc;
}

function finalHotWaterTemperature(){
    var tc1 = document.getElementById("tc1").value;
    var tc2 = document.getElementById("tc2").value;     
    var mc = document.getElementById("mc").value;    
    var th1 = document.getElementById("th1").value;        
    var mh = document.getElementById("mh").value;    
    var cph = document.getElementById("cph").value;    
    var cpc = 0;
    var hotWaterTemperature = document.getElementById('finalHotWaterTemperature');
    cpc = ((parseInt(tc1) + parseInt(tc2))/2);
    qc = heatTransferRate(mc,tc2,tc1,cpc);
    temp = ((qc/(mh*cph)));
    th2 = th1 - temp;
    var arredondado = parseFloat(th2.toFixed(4));
    hotWaterTemperature.style.display = 'block';
    document.getElementById("initialTemperature").innerHTML = th1;
    document.getElementById("th2").innerHTML = arredondado;
}

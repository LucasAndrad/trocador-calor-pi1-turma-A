
function receivesInput(tc1, tc2){
    var form = document.getElementById("form1");
    var tc1 = document.getElementById("tc1").value;
    var tc2 = document.getElementById("tc2").value;     
    var mc = document.getElementById("mc").value;    
    var th1 = document.getElementById("th1").value;        
    var mn = document.getElementById("mn").value;    
    var cph = document.getElementById("cph").value;    

   
    console.log("TC1 = " + tc1);
    console.log("TC2 = " + tc2);
    console.log("mc = " + mc);
    console.log("th1 = " + th1);
    console.log("mn = " + mn);
    console.log("cph = " + cph);
    // form.addEventListener('click', function(event) {
    //     if(tc1 == '1' || tc2 === '1'){
    //         event.preventDefault();
    //         console.log("Não enviado");
    //     }
    // });

}


function toggleTabs(tabId){
var tab1a = document.getElementById('tab-a1');
var tab2a = document.getElementById('tab-a2');
    if(tabId<2){
        tab1a.style.display="block";
        tab2a.style.display="none";
    }
    else{
        tab1a.style.display="none";
        tab2a.style.display = "block";
    }
}
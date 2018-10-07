
var tab1a = document.getElementById('tab-a1');
var tab2a = document.getElementById('tab-a2');

function toggleTabs(tabId){
    console.log(tab1a.style);
    if(tabId<2){
        tab1a.style.display = 'inherit';
        tab2a.style.display = 'none';
    }
    else{
        tab1a.style.display = 'none';
        tab2a.style.display = 'inherit';
    }
}
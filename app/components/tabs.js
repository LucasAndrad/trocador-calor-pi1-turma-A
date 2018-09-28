// var tabButtons=document.querySelectorAll(".tabs .button button");
var tabPanels=document.querySelectorAll(".tabs  .tab");
var tabPanels2=document.querySelectorAll(".tabs  .tab2");

function showPanel(panelIndex) {
    tabPanels.forEach(function(node){
        node.style.display="none";
    });
    switch(panelIndex){
        case 0:
            tabPanels[panelIndex].style.display="block";
            tabPanels2[panelIndex].style.display="none";
        break;
        case 1:
            tabPanels[panelIndex-1].style.display="none";
            tabPanels2[panelIndex-1].style.display="block";
        break;
    }
}
showPanel(0);
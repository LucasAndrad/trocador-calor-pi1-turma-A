var tabs = document.getElementById('tabs');
var tab1 = document.getElementById('tab1');
var tab2 = document.getElementById('tab2');
var tab1Title =  document.getElementById('tab1-title');
var tab2Title =  document.getElementById('tab2-title');

function toggleTabs(tabId) {
	if (tabId < 2) {
		tab1.style.display = 'inherit';
		tab2.style.display = 'none';
		tab1Title.style.border = '2px solid #769bff';
		tab2Title.style.border = '2px solid #ffffff';
		tabs.style.borderTop = '10px solid #769bff';
	} else {
		tab1.style.display = 'none';
		tab2.style.display = 'inherit';
		tab1Title.style.border = '2px solid #ffffff';
		tab2Title.style.border = '2px solid #fd5f54';
		tabs.style.borderTop = '10px solid #fd5f54';
	}
}
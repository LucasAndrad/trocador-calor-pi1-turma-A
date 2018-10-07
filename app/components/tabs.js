var tab1 = document.getElementById('tab1');
var tab2 = document.getElementById('tab2');

function toggleTabs(tabId) {
	console.log(tab1.style);
	if (tabId < 2) {
		tab1.style.display = 'inherit';
		tab2.style.display = 'none';
	} else {
		tab1.style.display = 'none';
		tab2.style.display = 'inherit';
	}
}
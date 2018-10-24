var tabs = document.getElementById('tabs');
var tab1 = document.getElementById('tab1');
var tab2 = document.getElementById('tab2');
var tab3 = document.getElementById('tab3');
var tab1Title = document.getElementById('tab1-title');
var tab2Title = document.getElementById('tab2-title');
var tab3Title = document.getElementById('tab3-title');

function toggleTabs(tabId) {
	if (tabId < 2) {
    resetTabs();
    setTab(tab1, tab1Title, '#769bff');
	}
	if (tabId == 2) {
    resetTabs();
    setTab(tab2, tab2Title, '#fd5f54');
	}
	if (tabId > 2) {
    resetTabs();
    setTab(tab3, tab3Title, '#ADFF2F');
	}
}

function resetTabs() {
	tab1.style.display = 'none';
	tab2.style.display = 'none';
	tab3.style.display = 'none';
	tab1Title.style.border = '2px solid #ffffff';
	tab2Title.style.border = '2px solid #ffffff';
	tab3Title.style.border = '2px solid #ffffff';
}

function setTab(tab, title, color) {
  tab.style.display = 'inherit';
	title.style.border = '2px solid '+color;
	tabs.style.borderTop = '10px solid '+color;
}
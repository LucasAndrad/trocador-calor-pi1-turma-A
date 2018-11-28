var Chart = require('chart.js');

var labels = ['-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', 'atual'];
var pressaoCasco1 = [0,0,0,0,0,0,0,0,0,0,0]
var config = {
	type: 'line',
	data: {
		labels: labels,
		datasets: [{
      label: 'Pressão',
			backgroundColor: 'rgb(255, 52, 124)',
			borderColor: 'rgb(255, 52, 124)',
			data: pressaoCasco1,
			fill: false,
		}]
	},
	options: {
		responsive: true,
		title: {
			display: true,
			text: 'Queda de Pressão nos Cascos'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Tempo (s)'
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Pressão'
				}
			}]
		}
	}
};

var ctx = document.getElementById('pressaoCasco').getContext('2d');
chart = new Chart(ctx, config);

// Função para atualizar gráfico de Queda de Pressão nos Cascos
function updateCascoChart(nextData){
  for (var i = 0; i<10; i++){
    pressaoCasco1[i] = pressaoCasco1[i+1]
  }
  pressaoCasco1[10] = nextData[0]
  chart.update();
}

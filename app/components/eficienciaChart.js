var Chart = require('chart.js');

var labels = ['-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', 'atual'];
var eficiencia1 = [0,0,0,0,0,0,0,0,0,0,0]
var config = {
	type: 'line',
	data: {
		labels: labels,
		datasets: [{
      label: 'Eficiência Energética',
			backgroundColor: 'rgb(255, 151, 38)',
			borderColor: 'rgb(255, 151, 38)',
			data: eficiencia1,
			fill: false,
		}]
	},
	options: {
		responsive: true,
		title: {
			display: true,
			text: 'Variação da temperatura'
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
					labelString: 'Eficiência Energética'
				}
			}]
		}
	}
};

var ctx = document.getElementById('eficiencia').getContext('2d');
chart = new Chart(ctx, config);

// Função para atualizar gráfico de eficiência energética
function updateEficienciaChart(nextData){
  for (var i = 0; i<10; i++){
    eficiencia1[i] = eficiencia1[i+1]
  }
  eficiencia1[10] = nextData[0]
  chart.update();
}

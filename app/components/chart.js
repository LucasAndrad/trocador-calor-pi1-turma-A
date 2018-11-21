var Chart = require('chart.js');

var labels = ['-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1', 'atual'];
var dataSensor1 = [0,0,0,0,0,0,0,0,0,0,0]
var dataSensor2 = [0,0,0,0,0,0,0,0,0,0,0]
var dataSensor3 = [0,0,0,0,0,0,0,0,0,0,0]
var dataSensor4 = [0,0,0,0,0,0,0,0,0,0,0]
var config = {
	type: 'line',
	data: {
		labels: labels,
		datasets: [{
      label: '1',
			backgroundColor: 'rgb(255, 52, 124)',
			borderColor: 'rgb(255, 52, 124)',
			data: dataSensor1,
			fill: false,
		}, {
			label: '2',
			fill: false,
			backgroundColor: 'rgb(255, 151, 38)',
			borderColor: 'rgb(255, 151, 38)',
			data: dataSensor2,
		}, {
      label: '3',
      fill: false,
      backgroundColor: 'rgb(47, 145, 229)',
      borderColor: 'rgb(47, 145, 229)',
      data: dataSensor3,
    }, {
      label: '4',
      fill: false,
      backgroundColor: 'rgb(185, 2, 253)',
      borderColor: 'rgb(185, 2, 253)',
      data: dataSensor4,
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
					labelString: 'Temperatura (°C)'
				}
			}]
		}
	}
};

var ctx = document.getElementById('chart').getContext('2d');
chart = new Chart(ctx, config);

function updateChart(nextData){
  for (var i = 0; i<10; i++){
    dataSensor1[i] = dataSensor1[i+1]
    dataSensor2[i] = dataSensor2[i+1]
    dataSensor3[i] = dataSensor3[i+1]
    dataSensor4[i] = dataSensor4[i+1]
  }
  dataSensor1[10] = nextData[0]
  dataSensor2[10] = nextData[1]
  dataSensor3[10] = nextData[2]
  dataSensor4[10] = nextData[3]
  chart.update();
}

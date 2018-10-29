var sensorsDatas = [
  ['tempo', '1', '2','3','4','5'],
  [-10,   0,0,0,0,0],
  [-9,   0,0,0,0,0],
  [-8,   0,0,0,0,0],
  [-7,   0,0,0,0,0],
  [-6,   0,0,0,0,0],
  [-5,   0,0,0,0,0],
  [-4,   0,0,0,0,0],
  [-3,   0,0,0,0,0],
  [-2,   0,0,0,0,0],
  [-1,   0,0,0,0,0],
  [0,   0,0,0,0,0],
]

function updateChart(nextData){
  for (var i = 1; i <= 10; i++){
    sensorsDatas[i][0]++
    for (var j = 1; j <= 5; j++){
      sensorsDatas[i][j] = sensorsDatas[i+1][j]
    }
  }
  sensorsDatas[11][0]++
  for (var i = 1; i <= 5 ; i++) {
    sensorsDatas[11][i] = nextData[i-1]
  }

  drawChart()
}

google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
        var data = google.visualization.arrayToDataTable(sensorsDatas);

        var options = {
          title: 'Variação de temperatura',
          curveType:'function',

            VAxis:{
                format: 'currency',
                gridlines:{count:5} },
            chartArea:{
                    left:30,
                    right:50,
                    top:50
            },
            legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart'));

        chart.draw(data, options);
      }

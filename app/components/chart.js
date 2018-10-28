google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['tempo', 'Sensor1', 'Sensor2','Sensor3','Sensor4','Sensor5'],
          ['0',   10,50,60,70,80],
          ['10',   30,10,0,0,0],
          ['20',   40,56,57,44,10],
          ['30',   50,8,8,35,36],
          ['40',   60,25,24,20,10],
          ['50',   60,25,24,20,10],
          ['60',   60,25,24,20,10],
          ['70',   60,25,24,20,10],
          ['80',   60,25,24,20,10],
          ['90',   60,25,24,20,10],
          ['100',   60,25,24,20,10],
        ]);

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

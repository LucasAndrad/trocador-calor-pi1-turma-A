function buildTable(){
  var tableBody = $('#temperatureTable');
  if(temperatureData.length != 0){
    var contador = 0;
    var ordem = 0;
    var tr = "<tr>";
    var soma = 0;
    for(var i = 0; i < temperatureData.length; i++){
        tr += "<td>" + temperatureData[i].temperature;
        // alert(temperatureData[i].temperature);
        contador++;
        if(contador == 4){
          tr += "<td>" + (ordem+1);
          tableBody.append(tr);
          tr = "</tr>";
          contador = 0;
          ordem++;
          tr="<tr>";
        }
    }
  }
  else{
    alert("Tabela Vazia!");
  }
}

function calculateLinesOfTable(){
  var table = document.getElementById('temperatureTable');
  var totalOflines = table.getElementsByTagName('tr');
  var lines = totalOflines.length;

  return lines;
}

function calculateMedia(temperatures){
  var valorSoma = 0, arraySoma = [];
  for(var i = 0; i < temperatures.length; i++){
    arraySoma[i] = parseFloat(temperatures[i].value);
    valorSoma += parseFloat(temperatures[i]);
  }
  var media = (valorSoma/calculateLinesOfTable()).toFixed(2);

  return media;
}

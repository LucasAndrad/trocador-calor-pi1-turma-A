// We will not use jquery
// See the second answer to lear how to read data from .json file with JS
// https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript

$(function() {
  $.getJSON('./app/mocks/example_parsed.json', function(data) {
    var temperature = data[0].temperature;
    document.getElementById("temperature1").innerHTML = temperature;
    var temperature = data[1].temperature;
    document.getElementById("temperature2").innerHTML = temperature;
    var temperature = data[2].temperature;
    document.getElementById("temperature3").innerHTML = temperature;
    var temperature = data[3].temperature;
    document.getElementById("temperature4").innerHTML = temperature;
  });
});
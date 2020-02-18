document.getElementById("search-btn").addEventListener("click", calljQuery);

function callAPI() {
  var f = 1;
  var req = new XMLHttpRequest();
  var URL = 'https://swapi.co/api/people/?page=' + f;
  req.open('GET', URL, true);
  req.addEventListener('load', function (){
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      console.log(response);

      for (var i = 0; i < response.results.length; i++) {
        (function(y) {
          var person = document.getElementById('person')
          person.textContent = response.results[y].name;

          var personHome = document.getElementById('personHome');
          var homeReq = new XMLHttpRequest();
          var planetURL = response.results[y].homeworld.toString();
          homeReq.open('GET', planetURL, true);
          homeReq.addEventListener('load', function () {
            if (homeReq.status >= 200 && homeReq.status < 400) {
              var planetResponse = JSON.parse(homeReq.responseText);
              console.log(planetResponse);
              personHome.textContent = 'Homeworld: ' + planetResponse.name;

            } else {
              console.log('Error with network request: ' + req.statusText);
            }});
            homeReq.send();
        })(i);
      }
    } else {
      console.log('Error with network request: ' + req.statusText);
    }});
    req.send();
  
}

function calljQuery() {
  $.ajax({url: "https://swapi.co/api/peoplex/?page=" + 1, 
  
    success: function(result){
      $("#div1").append("<ul>")
      for (var i = 0; i < result.results.length; i++) {
        $("#div1").append("<li>"+ result.results[i].name + "</li>");
      }  
      $("#div1").append("</ul>") 
    },
    error: function(xhr, status, error){
      var errorMessage = xhr.status + ': ' + xhr.statusText
      alert('Error - ' + xhr.status);
    }
});
}
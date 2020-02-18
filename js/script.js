document.getElementById("search-btn").addEventListener("click", callAPI);

 
function callAPI() {


function getRandomInt(max) {
  return Math.floor(Math.random(87) * Math.floor(max));
}
let randomNum = getRandomInt(87);


  $.ajax({url: "https://swapi.co/api/people/" + randomNum,  
    success: function(result){
      
      $("#person").append("Name: " + result.name);
      $("#gender").append("Gender: " + result.gender);
        
        var planetURL = result.homeworld;
        $.ajax({url: planetURL, success: function(planetresult){
          $("#homePlanet").append("Homeplanet: " + planetresult.name);
        }});
        
    },
    error: function(xhr, status, error){
      var errorMessage = xhr.status + ': ' + xhr.statusText
      alert('Error - ' + xhr.status);
    }
});
}
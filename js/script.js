document.getElementById("search-btn").addEventListener("click", callAPI);

 
function callAPI() {


function getRandomInt(max) {
  return Math.floor((Math.random() * max) + 1);
}
let randomNum = getRandomInt(87);


  $.ajax({url: "https://swapi.co/api/people/" + randomNum,  
    success: function(result){
      
      $("#person").html("Name: " + result.name);
      $("#gender").html("Gender: " + result.gender);
        
        let planetURL = result.homeworld;
        $.ajax({url: planetURL, success: function(planetresult){
          $("#homePlanet").html("Homeplanet: " + planetresult.name);
        }});
        if (result.films.length > 0) {
          for (var i = 0; i < result.films.length; i++) {
            
              var movieURL = result.films[i];

              $.ajax({url: movieURL, success : function(newResult){
                $("#movieList").append("<li> Appears in: " + newResult.title + "</li>");
              }})
          }
        }
        
    },
    error: function(xhr, status, error){
      let errorMessage = xhr.status + ': ' + xhr.statusText
      alert('Error - ' + xhr.status);
    }
});
}
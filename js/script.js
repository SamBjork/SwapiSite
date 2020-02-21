document.getElementById("search-btn").addEventListener("click", callAPI);


function getRandomInt(max) {
  return Math.floor((Math.random() * max) + 1);
}
      
 
function callAPI() {

  let randomNum = getRandomInt(87);

  $.ajax({url: "https://swapi.co/api/people/" + randomNum,  
    success: function(result){
      
      $("#person").html(result.name);
      $("#gender").html("Gender: " + result.gender);
        
        let planetURL = result.homeworld;
        $.ajax({url: planetURL, success: function(planetresult){
          $("#homePlanet").html("Homeplanet: " + planetresult.name);
        }});
        if (result.films.length > 0) {
          for (var i = 0; i < result.films.length; i++) {
            
              var movieURL = result.films[i];

              $.ajax({url: movieURL, success : function(newResult){
                $("#movieList").append("<li>" + newResult.title + "</li>");
              }});
          }
        }
        
        $('html, body').animate({
          scrollTop: $("#info").offset().top
        }, 2000);
    },
    error: function(xhr, status, error){
      let errorMessage = xhr.status + ': ' + xhr.statusText
      alert('Error - ' + xhr.status);
    }
});
}
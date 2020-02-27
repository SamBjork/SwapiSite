$("#person-search").on("input", () =>{
  if($("#person-search").val().length > 1)
  { 
    $('#spinner').show(); 
    let queryUrl = "https://swapi.co/api/people/?search=" + $("#person-search").val();

    var foundStarWarsCharacterInList = undefined;
    var opts = document.getElementById('people').childNodes;
    for(let i = 0 ;i < opts.length; i++) {
      let starWarsCharacter = $("#"+i).data("datavalue");
      if(starWarsCharacter.name === $("#person-search").val()) {
        foundStarWarsCharacterInList = starWarsCharacter;
        break;
      }
    }

    if(foundStarWarsCharacterInList !== undefined) {
      outputCharacter(foundStarWarsCharacterInList)
    }
    else {

      $.ajax({
        url: queryUrl,
        dataType: 'json',
        success: (response) => {
          $("#people").empty();
          for(let i = 0; i < response.results.length; i++) {
            let starWarsCharacter = response.results[i];
            $("#people").append("<option id="+i+">" + starWarsCharacter.name + "</option>");
            $("#"+i).data('datavalue', starWarsCharacter);
          }
          $('#spinner').hide();
        },
        error: (xhr, status, error) => {
          let errorMessage = xhr + " " + status + " " + error;
            alert(errorMessage);
        }
      });
    }              
  }
});

document.getElementById("random-btn").addEventListener("click", getRandomCharacter);






function overlayOn() {
  document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
}

function getRandomInt(max) {
    return Math.floor((Math.random() * max) + 1);
}

function outputCharacter(character) {

  $("#person").html(character.name);
  const upperGender = character.gender.replace(/^\w/, c => c.toUpperCase());
  $("#gender").html(upperGender);
  let planetURL = character.homeworld;
  $.ajax({
      url: planetURL,
      success: (planetResult) => {
          $("#homePlanet").html(planetResult.name);
      }
  });
  $("#movieList").empty();
  if (character.films.length > 0) {
      for (var i = 0; i < character.films.length; i++) {
          var movieURL = character.films[i];
          $.ajax({
              url: movieURL,
              success: (movieResult) => {
                  $("#movieList").append("<li>" + movieResult.title + "</li>");
              }
          });
      }
  }

  $('body').animate({
      scrollTop: $("#all-info").offset().top
  }, 2000);
  $('#spinner').hide();
  overlayOff();
}

  
function getRandomCharacter() {

    $('#spinner').show();

    overlayOn();

    let randomNum = getRandomInt(86);

    $.ajax({
        url: "https://swapi.co/api/people/" + randomNum,
        success: function (result) {
          outputCharacter(result);
          
        },
        error: (xhr, status, error) => {
            let errorMessage = xhr + " " + status + " " + error;
            alert(errorMessage);
        }
    });
}

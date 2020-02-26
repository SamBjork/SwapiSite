$("#person-search").on("input", () =>{
  if($("#person-search").val().length > 1) {
  let queryUrl = "https://swapi.co/api/people/?search=" + $("#person-search").val();
    //Kontrollera om person-search = något option i people
    var foundCharacterInList = undefined;
    var opts = document.getElementById('people').childNodes;
    for(let i = 0 ;i < opts.length; i++) {
      let character = $("#"+i).data("datavalue");
      if(character.name === $("#person-search").val()) {
        foundCharacterInList = character;
        break;
      }
    }

    if(foundCharacterInList !== undefined) {
      outputCharacter(foundCharacterInList)
    }
    else {

      $.ajax({
        url: queryUrl,
        dataType: 'json',
        success: (response) => {
          $("#people").empty();
          for(let i = 0; i < response.results.length; i++) {
            let char = response.results[i];
            let opt =  $("#people").append("<option id="+i+">" + char.name + "</option>");
            $("#"+i).data('datavalue', char);
          }
        },
        error: (xhr, status, error) => {
          console.log(xhr + " " + status + " " + error);
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

  $("#person").empty();
  $("#person").html(character.name);
  const upper = character.gender.replace(/^\w/, c => c.toUpperCase());
  $("#gender").empty();
  $("#gender").html(upper);
  let planetURL = character.homeworld;
  $("#homePlanet").empty();
  $.ajax({
      url: planetURL,
      success: function (planetresult) {
          $("#homePlanet").html(planetresult.name);
      }
  });
  $("#movieList").empty();
  if (character.films.length > 0) {
      for (var i = 0; i < character.films.length; i++) {
          var movieURL = character.films[i];
          $.ajax({
              url: movieURL,
              success: function (newResult) {
                  $("#movieList").append("<li>" + newResult.title + "</li>");
              }
          });
      }
  }

  $('html, body').animate({
      scrollTop: $("#all-info").offset().top
  }, 1500);
  $('#spinner').hide();
  overlayOff();
}

  
function getRandomCharacter() {

    $('#spinner').show();

    overlayOn();

    let randomNum = getRandomInt(87);

    $.ajax({
        url: "https://swapi.co/api/people/" + randomNum,
        success: function (result) {
          outputCharacter(result);
          
        },
        error: function (xhr, status, error) {
            let errorMessage = xhr.status + ': ' + xhr.statusText
            alert(errorMessage);
        }
    });
}

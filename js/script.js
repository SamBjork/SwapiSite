document.getElementById("search-btn").addEventListener("click", callAPI);

function overlayOn() {
  document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
}

function getRandomInt(max) {
    return Math.floor((Math.random() * max) + 1);
}


  $(() => {
    $("#submit").click(() =>{
        $("#person").empty();
        let personSearch = $("#person-search").val();
        let personVal = document.querySelector("#people").children[0].dataset.value;
        fetch("https://swapi.co/api/people/" + personVal,
            {
            })
            .then(response => response.json())
            .then(json => {
                $("#person").html(json.original_title);
                const upper = json.gender.replace(/^\w/, c => c.toUpperCase());
                $("#gender").html(upper);
                let planetURL = json.homeworld;
                $("#homePlanet").empty();                
                $("#homePlanet").html(json.homeworld);
                $.ajax({
                  url: planetURL,
                  success: function (planetresult) {
                      $("#homePlanet").html(planetresult.name);
                  }
              });              
              $("#movieList").empty();
              if (result.films.length > 0) {
                  for (var i = 0; i < result.films.length; i++) {
                      var movieURL = json.films[i];
                      $.ajax({
                          url: movieURL,
                          success: function (newResult) {
                              $("#movieList").append("<li>" + newResult.title + "</li>");
            }
    });

    $("#person-search").on("input", () =>{
        if($("#person-search").val().length > 3) {
            let queryUrl = "https://swapi.co/api/people/partial?partial_name=" + $("#person-search").val();
            
            $.ajax({
                url: queryUrl,
                dataType: 'json',
                success: (result) => {
                    $("#people").empty();
                    for(let i = 0; i < result.length; i++) {
                        let [id, name] = result[i];
                        $("#people").append("<option data-value='" + id + "'>" + name + "</option>");
                    }
                },
                error: (xhr, status, error) => {
                    console.log(xhr + " " + status + " " + error);
                }
              });
            };
          });
        };
      };
    });
  });
})

function callAPI() {

    $('#spinner').show();

    overlayOn();

    let randomNum = getRandomInt(87);

    $.ajax({
        url: "https://swapi.co/api/people/" + randomNum,
        success: function (result) {

          $("#person").empty();
          $("#person").html(result.name);
          const upper = result.gender.replace(/^\w/, c => c.toUpperCase());
          $("#gender").empty();
          $("#gender").html(upper);
          let planetURL = result.homeworld;
          $("#homePlanet").empty();
          $.ajax({
              url: planetURL,
              success: function (planetresult) {
                  $("#homePlanet").html(planetresult.name);
              }
          });
          $("#movieList").empty();
          if (result.films.length > 0) {
              for (var i = 0; i < result.films.length; i++) {
                  var movieURL = result.films[i];
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
          }, 2000);
          $('#spinner').hide();
          overlayOff();

        },
        error: function (xhr, status, error) {
            let errorMessage = xhr.status + ': ' + xhr.statusText
            alert(errorMessage);
        }
    });
}

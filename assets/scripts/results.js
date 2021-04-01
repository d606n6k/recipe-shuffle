new Splide( '.splide' ).mount();
// Variables
var query = "salmon";
var cuisine = "japanese";
var diet ;
var ingString;

// label, image, ingredients [], dietLabels, healthLabels


// https://api.edamam.com/api/food-database/v2/parser?ingr=red%20apple&app_id={your app_id}&app_key={your app_key}

function parseAPI() {
    var locQueryUrl = "https://api.edamam.com/api/food-database/v2/parser?ingr=" + ingString + "&app_id=9fd01ccc&app_key=9749e250b92bf45333cce1c15593d941"

    console.log(locQueryUrl);

    fetch(locQueryUrl)
    .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
    .then(function(locRes) {
        console.log(locRes)
        console.log(locRes.parsed[0].food.label)
    })
}

function searchApi() {
    var locQueryUrl = "https://api.edamam.com/search?app_id=89a077a3&app_key=71f15e83ac336ca5a82773d77c533a21&imageSize=LARGE&ingr=5&q=" + query;
    
  
    if (!query) {
        throw new Error ("Missing query -- query is required") 
          } 
    
    if (cuisine) {
    locQueryUrl = locQueryUrl + "&cuisineType=" + cuisine;
    }

    if (diet) {
        locQueryUrl += "&dietLabels=" + diet;
      }
      console.log(locQueryUrl);
  
    fetch(locQueryUrl)
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
  
        return response.json();
      })
      .then(function (locRes) {
        
        console.log(locRes)
        ingString = locRes.hits[0].recipe.ingredients[4].text
        for (i=0; i<2; i++){
            console.log(locRes.hits[i].recipe.label)
            console.log(locRes.hits[i].recipe.image)
            console.log(locRes.hits[i].recipe.ingredients)
            console.log(locRes.hits[i].recipe.dietLabels)
            // console.log(locRes.hits[i].recipe.healthLabels)
        }
      })
      .then(parseAPI)
      .catch(function (error) {
        console.error(error);
      });
  }
searchApi();
// temp vars for test driving
var runBtn = document.querySelector("#run");
var query = "chicken";
var cuisine = "";
var diet = "";
runBtn.addEventListener("click", searchApi);
// eventually holds all the recipes and ingredients from api
var recipes = [];
// Fetches parsed ingredient name and pushes into recipe.populatedIngredients;
// and, returns a promise for the ingredient request. Accepts an ingredient
// object from API and the recipe it belongs to.
//
// WARNING: This does not return the recipe or an array of ingredients. The
// returned fetch request exposes the promise so that an array of these
// ingredient requests may be passed to Promise.all.
function parseIngredient(ingredient, recipe) {
  var url =
    "https://api.edamam.com/api/food-database/v2/parser?ingr=" +
    ingredient.text +
    "&app_id=9fd01ccc&app_key=9749e250b92bf45333cce1c15593d941";
  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        console.log(
          "Failed to fetch ingredient:",
          ingredient.text,
          recipe.label
        );
        return null;
      }
      return response.json();
    })
    .then(function (data) {
      if (data) {
        // add the parsed ingredient label to the populatedIngredients array
        // which was added to the recipe
        recipe.populatedIngredients.push(data.parsed[0].food.label);
      }
    });
}
function searchApi() {
  var locQueryUrl =
    "https://api.edamam.com/search?app_id=89a077a3&app_key=71f15e83ac336ca5a82773d77c533a21&imageSize=LARGE&ingr=5&q=" +
    query;
  if (!query) {
    throw new Error("Missing query -- query is required");
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
      if (!locRes.hits) {
        return;
      }
      // array to hold fetch promises so they may be passed to Promise.all()
      var ingredientRequests = [];
      var maxRecipes = 1;
      recipes = locRes.hits.slice(0, maxRecipes).map(function (hit) {
        var recipe = hit.recipe;
        recipe.populatedIngredients = [];
        recipe.ingredients.forEach(function (ingredient) {
          ingredientRequests.push(parseIngredient(ingredient, recipe));
        });
        return recipe;
      });
      return Promise.all(ingredientRequests);
    })
    .then(function () {
      // array of recipes with populatedIngredients
      console.log(recipes);
    })
    .catch(function (error) {
      console.error(error);
    });
}












































































































// ############################ OLD CODE ################################################
// new Splide( '.splide' ).mount();
// // Variables
// var query = "salmon";
// var cuisine = "japanese";
// var diet;
// var ingString = [];
// var picNameEl = $("#picName");
// var listUL1 = $(".listUL1")
// var listUL2 = $(".listUL2")
// var listUL3 = $(".listUL3")
// var listUL4 = $(".listUL4")
// var listUL5 = $(".listUL5")
// // var listUL = $(".listUL")
// // var listLi = listUl.children();
// // var listLiVal = listLi.chilren().children() hahahahahahahahah
// // var ingrText = [];
// var recipeArr = [];

// // label, image, ingredients [], dietLabels, healthLabels


// // https://api.edamam.com/api/food-database/v2/parser?ingr=red%20apple&app_id={your app_id}&app_key={your app_key}

// function parseAPI() {
//   for (var i=0; i<recipeArr.length; i++) {
//     var ingredients = recipeArr[i].recipe.ingredients;
//     for (var j=0; j<ingredients.length; j++) {
//       var ingredientText = ingredients[j];
//       var locQueryUrl = "https://api.edamam.com/api/food-database/v2/parser?ingr=" + ingredientText + "&app_id=9fd01ccc&app_key=9749e250b92bf45333cce1c15593d941"
//       fetch(locQueryUrl)
//       .then(function (response) {
//         if (!response.ok) {
//           throw response.json();
//         }
  
//         return response.json();
//       })
//       .then(function(locRes) {
//         // console.log(locRes)
//         // console.log(locRes.parsed[0].food.label)
//         // ingrText.push(locRes.parsed[0].food.label);
        
//     })
//     }

//     console.log(locQueryUrl);

    
//   } 
    
// }

// function populateRecipe() {
  
// }

// function searchApi() {
//     var locQueryUrl = "https://api.edamam.com/search?app_id=89a077a3&app_key=71f15e83ac336ca5a82773d77c533a21&imageSize=LARGE&ingr=5&q=" + query;
    
  
//     if (!query) {
//         throw new Error ("Missing query -- query is required") 
//           } 
    
//     if (cuisine) {
//     locQueryUrl = locQueryUrl + "&cuisineType=" + cuisine;
//     }

//     if (diet) {
//         locQueryUrl += "&dietLabels=" + diet;
//       }
//       console.log(locQueryUrl);
  
//     fetch(locQueryUrl)
//       .then(function (response) {
//         if (!response.ok) {
//           throw response.json();
//         }
  
//         return response.json();
//       })
//       .then(function (locRes) {
//         if (locRes.hits) {
//           recipeArr = locRes.hits.slice(0,5);
//         } 
      
//         // console.log(recipeArr)
//         // ingredients = locRes.hits[0].recipe.ingredients
//         // console.log(ingredients[0].text)
//         // for (i=0; i<ingredients.length; i++) {
//         //   ingString.push(ingredients[i].text);
//         // }
//         // console.log(ingString)
//         // for (i=0; i<2; i++){
//         //     console.log(locRes.hits[i].recipe.label)
//         //     // set label to fill expected html element by ID
//         //     console.log(locRes.hits[i].recipe.image)
//         //     // set img to fill expected html element by ID
//         //     console.log(locRes.hits[i].recipe.ingredients)
            
//         //     // set ingredients to fill expected html element by ID
//         //     console.log(locRes.hits[i].recipe.dietLabels)
//         //     // set dietLabels to fill expected html element by ID
//         //     // console.log(locRes.hits[i].recipe.healthLabels)
//         // }
//       })
//       .then(parseAPI)
//       .catch(function (error) {
//         console.error(error);
//       });
//   }
// searchApi();


// // function populateIngredients() {
  
// // }
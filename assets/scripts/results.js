// new Splide( '.splide' ).mount();

new Splide( '.splide', {
	type   : 'fade',
	padding: {
		right: '5rem',
		left : '5rem',
	},
} ).mount();

var listUL = $(".listUL")
// temp vars for test driving
var runBtn = document.querySelector("#run");
var popBtn = document.querySelector("#populate");
var labels = document.querySelectorAll("h3")
var recipe1Name = document.querySelector("#recipe1Name")
var recipe2Name = document.querySelector("#recipe2Name")
var recipe3Name = document.querySelector("#recipe3Name")
var query;
var cuisine;
var diet;
// runBtn.addEventListener("click", getParams);
// popBtn.addEventListener("click", renderRecipes);
// temp recipes for testing
var recipe0 = {
  label: "BBQ Chicken Roll Ups",
  image: "https://www.edamam.com/web-img/a3f/a3f8f2dbd4c72841be852a7c19fc4488.jpeg",
  url: "https://www.foodnetwork.com/recipes/farm-rich-bbq-chicken-roll-ups-3414532",
  yield: "10",
  populatedIngredients: ["Cheddar Cheese", "Dinner Roll", "Chicken", "Pineapple", "BBQ Sauce"]
}
var recipe1 = {
  label: "BBQ Chicken",
  image: "https://www.edamam.com/web-img/fc6/fc6fc8939fadfcfbdf8d899b71466c14.jpg",
  url: "http://www.delish.com/cooking/recipe-ideas/recipes/a25896/bbq-chicken-1891/",
  yield: "12",
  populatedIngredients: ["Lemon", "Salt", "Onion", "Chicken"]
}
var recipe2 = {
  label: "Japanese Chicken Skewers With Scallion (Negima Yakitori) Recipe",
  image: "https://www.edamam.com/web-img/b2d/b2db47159040f3e9560ae4603e2edfaa.jpg",
  url: "https://www.seriouseats.com/recipes/2016/06/japanese-yakitori-negima-grilled-chicken-skewer-recipe.html",
  yield: "6",
  populatedIngredients: ["Teriyaki Sauce", "Scallion", "Kosher Salt", "Skinless Chicken Thigh"]
}
var recipes = [recipe0, recipe1, recipe2];
var ingrUls = $(".listSlide")

// init function
window.onload = function() {
  getParams();
};
  //   renderRecipes();

  //gets parameters from the url and starts the api fetch with said parameters
function getParams(){
  recipes.length = 0;
  var searchParamsArr = document.location.search.split('&');
  console.log(searchParamsArr);
  query = searchParamsArr[0].split('=').pop()
  cuisine = searchParamsArr[1].split('=').pop()
  diet = searchParamsArr[2].split('=').pop()
  console.log("query: "+query+" cuisine: " + cuisine + " diet: " + diet)
  searchApi();
}



function renderRecipes() {
  
  //populates background image on slides, and the name and urls to click on
  for (var i=0; i < recipes.length; i++){
    var recipeLink = document.createElement("a");
    // var newImgUrl = recipes[i].image.replace(".jpg","-l.jpg");
    var newImgUrl = recipes[i].image
    var slideDiv = listUL.children().eq(i).children()
    var recipeLabel = slideDiv.children().first()
    console.log(newImgUrl);
    $(recipeLink).attr("href", recipes[i].url);
    $(recipeLink).attr("target", "_blank");
    $(recipeLink).attr("data-index", i);
    $(recipeLabel).text(recipes[i].label);
    $(recipeLink).append(recipeLabel);
    slideDiv.prepend(recipeLink);
    $(ingrUls[i]).children().first().children().first().text(recipes[i].yield);
    listUL.children().eq(i).attr("style", "width:100%; background: url('"+newImgUrl+"') no-repeat; background-size: 100% 100%");

    recipe1Name.addEventListener("click", saveRecipe)
    recipe2Name.addEventListener("click", saveRecipe)
    recipe3Name.addEventListener("click", saveRecipe)

    // Attempt at wrapping link around entire div slide
    // var recipeSearchLink = document.createElement("a")
    // $(recipeSearchLink).attr("href", recipes[i].url)
    // listUL.children().eq(i).prepend(recipeSearchLink)
    
    // populates individual ingredient lists, with yield, parsed ingredients, and an icon/link that takes the user to amazon to buy the ingredient.
    for (var j=0; j<recipes[i].populatedIngredients.length; j++){
      var ingrLi = document.createElement("li");
      var ingrChk = document.createElement("input");
      var ingrSearchIcon = document.createElement("i");
      var ingrSearchLink = document.createElement("a");
      $(ingrLi).text(recipes[i].populatedIngredients[j]);
      $(ingrChk).attr("type", "checkbox"); 
      $(ingrChk).attr("style", "margin-right: .5rem;"); 
      $(ingrSearchIcon).attr("class", "fas fa-search-dollar")
      $(ingrSearchLink).attr("href", "https://www.amazon.com/s?k="+ recipes[i].populatedIngredients[j]+ "&i=amazonfresh&ref=recipeshuffle")
      $(ingrSearchLink).attr("style", "color: #f13341; margin-left: .5rem");
      $(ingrSearchLink).attr("target", "_blank");
      $(ingrLi).prepend(ingrChk);
      $(ingrLi).append(ingrSearchLink);
      $(ingrSearchLink).append(ingrSearchIcon);

      ingrUls[i].appendChild(ingrLi);
    } 
  }
  new Splide( '.splide', {
    type   : 'fade',
    padding: {
      right: '5rem',
      left : '5rem',
    },
  } ).mount();
}
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
    "https://api.edamam.com/search?app_id=89a077a3&app_key=71f15e83ac336ca5a82773d77c533a21&ingr=5&q=" +
    query + "&imageSize=LARGE";
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
      var maxRecipes = 3;
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
    .then(renderRecipes)
    .catch(function (error) {
      console.error(error);
    });
}

var recipeNo;
var savedRecipes = [];

// saves any recipe the user clicks on into local storage for display on homepage.
function saveRecipe(eventobject) {
recipeNo = $(eventobject.target).attr("data-index") 
console.log(recipeNo)
selectedRecipe = recipes[recipeNo];
if(!savedRecipes){
  savedRecipes= ["r"]
  savedRecipes[0] = selectedRecipe
} else {
savedRecipes.push(selectedRecipe);
}
localStorage.setItem("visitedRecipes", JSON.stringify(savedRecipes));
console.log(savedRecipes)
}

// gets recipes from local storage
function getVisitedRecipes (){
  savedRecipes = JSON.parse(localStorage.getItem("visitedRecipes"))
  console.log(savedRecipes)
}

getVisitedRecipes()

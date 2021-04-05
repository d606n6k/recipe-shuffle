var recipeBtn = document.querySelector('#recipe-btn');
var demoImg = document.querySelector('#demo-img');
var recipeLink = document.querySelector('#recipe-link');
var recipeName = document.querySelector('#recipe-name');

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
    url: "http://www.delish.com/cooking/recipe-ideas/recipes/a25896/bbq-chicken-1891/",
    yield: "6",
    populatedIngredients: ["Teriyaki Sauce", "Scallion", "Kosher Salt", "Skinless Chicken Thigh"]
  }
  var recipes = [recipe0, recipe1, recipe2];

function renderDemo (){
    randomIdx= Math.floor(Math.random() * 3)
    
    demoImg.setAttribute("src", recipes[randomIdx].image);
    recipeLink.setAttribute("href", recipes[randomIdx].url);
    recipeName.textContent = recipes[randomIdx].label;
    

}


function handleSearchFormSubmit(event) {
  event.preventDefault();

  var recipeInput = document.querySelector('#recipe-input').value;
  var cuisineInput = document.querySelector('#cuisine').value;
  var dietInput = document.querySelector('#diet').value;

  
  if (!recipeInput) {
      console.error('You need a search recipe value!');
      return;
    }
    
    var queryString = './results.html?q=' + recipeInput + '&cuisine=' + cuisineInput + '&diet=' + dietInput;
    
    location.assign(queryString);
}

recipeBtn.addEventListener('click', handleSearchFormSubmit);
renderDemo();
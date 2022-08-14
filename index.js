const search = document.getElementById('search');
submit = document.getElementById('submit');
random = document.getElementById('random');
mealsEl = document.getElementById('meals');
resultHeading = document.getElementById('result-heading');
single_mealEl = document.getElementById('single-meal');

/***** Search Meal and Fetch from API */
function searchMeal(e){
e.preventDefault();

// Clear Single-meal
single_mealEl.innerHTML = '';

const term= search.value;

if(term.trim()){
  

}

}

// Event Listeners
submit.addEventListener('submit', searchMeal);
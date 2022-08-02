// Assumption is const
const search= document.getElementById('search');
submit= document.getElementById('submit');
random = document.getElementById('random');
mealsEl= document.getElementById('meals');
resultHeading= document.getElementById('result-heading');
single_mealEl= document.getElementById('single-meal'); 

/***** Search Meal and Fetch from API */
function searchMeal(e){
  e.preventDefault();

  /**** Clear single-meal */
  single_mealEl.innerHTML = '';

  /***** Get search term */
  const term= search.value;
 
  /***** Check for Not be empty in search box,
   trim() method removes whitespace from both ends of a string and returns a new string */

  if(term.trim()){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res => res.json())
    .then(data=>{
     console.log(data);

  /*** Dom to visiable to UI */
     resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

      if (data.meals === null) {
        resultHeading.innerHTML = `<p>No Result for this search, Try again!</p>`
      }
      else {
        mealsEl.innerHTML = data.meals.map(meal => 
      `<div class="meal">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <h3>${meal.strMeal}</h3>
      <div class="meal-info" data-mealID="${meal.idMeal}">
      <div>
      </div>`
      )
      /*** inorder to display as string*/
      .join('');
    }
   });
  // Clear Search BOX from Text
   search.value='';
  }
  else{
    alert('Please enter a serach term')
  }
}

/**Fetch meal bt ID */
function getElementById(mealID){
  fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}')
  .then(res => res.json())
  .then(data=>{
    const meal= data.meals[0];
    addMealToDOM(meal)
  })
}
/** Add Meal to DOM */
function addMealToDOM(meal){
  const ingredients = [];

  for(let i=1; i<=20; i++){
    if(meal[`strIngredient ${i}`]){
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)

    } else {
      break

    }
  }

  single_mealEl.innerHTML=`
  <div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
  <div class="single-meal-info"> 
  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
  ${meal.strArea ? `<p>${meal.strArea}</p>` :''}
  </div>
  <div class="main">
  <p>${meal.strInstruction}</p>
  <h2>Ingredints</h2>
  <ul>
  ${ingredients.map(ing =>`<li>${ing}</li>`).join()}
  </ul>
</div>
  </div>
  `
  
}

// Event Listeners
submit.addEventListener('submit',searchMeal);

mealsEl.addEventListener('click', e=>{
  const mealInfo= e.path.find(item =>{

    if (item.classList){
      return item.classList.contains('meal-info');
    }else{
     return false
    }
    
  })
  // console.log(mealInfo)
  if(mealInfo){
    const mealID= mealInfo.getAttribute('data-mealid');
    getMealById(mealID)
   
  }
})

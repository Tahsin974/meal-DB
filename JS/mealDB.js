document.getElementById('error').style.display ='none';
const searchFood = ()=> {
    const searchField =document.getElementById('search-field');
    document.getElementById('error').style.display ='none';
    const searchText = searchField.value;
    searchField.value = '';
    if(searchText == ''){
        const errorResult = document.getElementById('error-result');
        const h1 = document.createElement('h1');
        h1.classList.add('text-light')
        h1.classList.add('text-center')
        h1.innerText = 'Please Write Something To Display';
        errorResult.appendChild(h1);
        console.log(errorResult)
    }
    else{
        const url = `https://www.themealdb.com/api/json/v11/1/search.php?s=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
        // use of catch
        .catch(error => displayError(error));
    }
}
const displayError = error => {
    document.getElementById('error').style.display ='block';
}
const displaySearchResult = meals =>{
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(meals == null){
        const errorResult = document.getElementById('error-result');
        const h1 = document.createElement('h1');
        h1.classList.add('text-light')
        h1.classList.add('text-center')
        h1.innerText = 'Result not found';
        errorResult.appendChild(h1);
        console.log(errorResult)
    }
    else{
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `
                <div onclick = "loadMealDetail('${meal.idMeal}')" class="card h-100 bg-grey">
                    <div class = " p-3">
                        <img src="${meal.strMealThumb}" class="card-img-top img-fluid rounded" alt="...">
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <p class="card-text">${meal.strInstructions.slice(0,250)}</p>
                    </div>
                </div>
            `
            ;
            searchResult.appendChild(div);
        })
    }
}
const loadMealDetail = mealId =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}
const displayMealDetails = meal =>{
    const mealDetails = document.getElementById('meal-detail');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('my-3');
    div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${meal.strMealThumb}" class="img-fluid h-100 rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
                    <a href="${meal.strYoutube}" class="btn btn-primary">Recipe Tutoriol</a>
            </div>
        </div>
    `;
    mealDetails.appendChild(div);
}

document.addEventListener('DOMContentLoaded', function () {

    async function getRecipes() {
        let url = "https://dummyjson.com/recipes?limit=12";
        let response = await fetch(url);
        let data = await response.json();
        return data.recipes; 
    }

    async function fillCards() {
        let recipes = await getRecipes();
        let cards = document.querySelectorAll('.card'); 

        for (let i = 0; i < recipes.length && i < cards.length; i++) {
            let recipe = recipes[i];
            let card = cards[i];

            let img = card.querySelector('.card-img-top');
            let title = card.querySelector('.card-title');
            let description = card.querySelector('.card-text');
            let difficulty = card.querySelector('.difficulty');
            let link = card.querySelector('.btn-see');
            let heart = card.querySelectorAll('.heart-icon');

            img.src = recipe.image; 
            img.alt = recipe.name;
            title.textContent = recipe.name;
            description.firstChild.textContent = recipe.cuisine; 
            difficulty.textContent = recipe.difficulty;
            link.href = `#recipe-${recipe.id}`; 

            for(let i=0; i<heart.length; i++){
                heart[i].addEventListener('click', function(){
                    if (heart[i].classList.contains('bi-heart')) {
                        heart[i].classList.remove("bi-heart");
                        heart[i].classList.add("bi-heart-fill");
                    } 
                    else { 
                    heart[i].classList.add("bi-heart");
                    heart[i].classList.remove("bi-heart-fill");
                    }
                saveFavorites();    
                }); 
            }
        }
        restoreFavorites();
    }
    fillCards();

    function saveFavorites() {
        let cards = document.querySelectorAll('.card'); 
        let favorites = []; 
    
        for (let i = 0; i < cards.length; i++) {
            let card = cards[i];
            let heart = card.querySelector('.heart-icon');
            
            if (heart.classList.contains('bi-heart-fill')) {
                let title = card.querySelector('.card-title').textContent;
                favorites.push({ title }); 
            }
        }
    
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    function restoreFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []; 
        let cards = document.querySelectorAll('.card');
    
        for (let card of cards) {
            let title = card.querySelector('.card-title').textContent;
            let heart = card.querySelector('.heart-icon');
    
            let isFavorite = false;
            for (let i = 0; i < favorites.length; i++) {
                if (favorites[i].title === title) {
                    isFavorite = true;
                    break;
                }
            }
    
            if (isFavorite) {
                heart.classList.remove('bi-heart');
                heart.classList.add('bi-heart-fill');
            }
        }
    }
    
    
    // étapes de l'enregistrement des favoris:
    // déclarer l'état du coeur: vide ou plein 
    // faire un event listener au click avec toggle pr ajouter ou enlever la class "fill" du coeur : bi-heart (vide pas favori) ou bi-heart-fill (favori)
    // ma recette a un coeur bi-heart-fill => je push ma recette dans mon local storage ( localStorage.setItem() )
    // récupérer les recettes favorites à chaque ouverture de la page

    let seetherecipe = document.querySelectorAll('.card .btn-see');
    for(let i=0; i<seemore.length; i++){
        seemore.addEventListener('click', function(){
        window.location.href="recipe_details.html";
    });
    } 

    // Script de la page détails :

    async function getRecipeDetails() {
        let url = "https://dummyjson.com/recipes?id";
        let response = await fetch(url);
        let data = await response.json();
        return data.recipeDetails; 
    }
   
    async function fillCardBisRecipeDetails() {
        let recipeDetails = await getRecipeDetails(); 
        let cardBis = document.querySelector('.card-bis'); 
    
        for (let i = 0; i < recipeDetails.length; i++) {
            let recipeDetails = recipeDetails[i];
            let cardBis = cardBis[i];
    
            cardBis.querySelector('.card-img-left').src = recipeDetails.image;
            cardBis.querySelector('.card-title').textContent = recipeDetails.title;
            cardBis.querySelector('.difficulty').textContent = recipeDetails.difficulty;
            cardBis.querySelector('.cuisine').textContent = recipeDetails.cuisine;
            cardBis.querySelector('.time').textContent = `${recipeDetails.prepTimeMinutes} mins`;
    
            let ingredientsList = cardBis.querySelector('.ingredients ul');
            ingredientsList.innerHTML = ""; 
            recipeDetails.ingredients.forEach(ingredient => {
                let li = document.createElement('li');
                li.textContent = ingredient;
                ingredientsList.appendChild(li);
            });
    
            let instructionsList = cardBis.querySelector('.instructions ol');
            instructionsList.innerHTML = ""; 
            recipeDetails.instructions.forEach(instruction => {
                let li = document.createElement('li');
                li.textContent = instruction;
                instructionsList.appendChild(li);
            });
        }
    }
    fillCardBisRecipeDetails();

});

   





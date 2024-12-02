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

            img.src = recipe.image; 
            img.alt = recipe.name;
            title.textContent = recipe.name;
            description.firstChild.textContent = recipe.cuisine; 
            difficulty.textContent = recipe.difficulty;
            link.href = `#recipe-${recipe.id}`; 
        }
    }

    fillCards();
});

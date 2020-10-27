// DOM's Elements
const ulNav = document.querySelector("nav > ul");
const imgRecipe = document.querySelector("img");
const h1 = document.querySelector("h1");
const description = document.querySelector("header > p");

const overview = document.getElementById("overview");

const difficulty = document.getElementById("difficulty");
const cost = document.getElementById("cost");
const preparation = document.getElementById("preparation-time");
const cooking = document.getElementById("cooking-time");
const resting = document.getElementById("resting-time");

const divIngredient = document.getElementById("divIngredient");

// Cost recipes content
const cheap = "€";
const affordable = "€€";
const expensive ="€€€";

// Level recipes content
const easy = "<i class='fas fa-star'></i>";
const intermediate = "<i class='fas fa-star'></i><i class='fas fa-star'></i>";
const difficult ="<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>";

// --- Create each content for each recipe --- //
ajaxGet("http://localhost/cooking-recipes/data/recipes.json", function(reponse){
    const recipes = JSON.parse(reponse);
    
    recipes.forEach(recipe => {
        
        // Create the navbar //
        const liNav = document.createElement("li");
        liNav.setAttribute("class","nav-item");
        const aNav = document.createElement("a");
        liNav.appendChild(aNav);
        aNav.setAttribute("class", "nav-link");
        aNav.href = "#";
        aNav.textContent = recipe.name;
        ulNav.appendChild(liNav);
        
        // Fill recipe's page for each click on a recipe //
        liNav.addEventListener("click", e =>{
            e.preventDefault();
            divIngredient.innerHTML = "";

            imgRecipe.src = recipe.picture;
            imgRecipe.alt = recipe.name;
            h1.textContent = recipe.name;
            description.textContent = recipe.description;
            preparation.textContent = recipe.preparation_time;
            cooking.textContent = recipe.cooking_time;
            resting.textContent = recipe.resting_time;
            
            // Overview
            if(recipe.cost === "cheap"){
                cost.textContent = cheap;
            } else if(recipe.cost === "affordable"){
                cost.textContent = affordable;
            } else {
                cost.textContent = expensive;
            }

            if(recipe.difficulty === "easy"){
                difficulty.innerHTML = easy;
            } else if(recipe.difficulty === "intermediate"){
                difficulty.innerHTML = intermediate;
            } else {
                difficulty.innerHTML = difficult;
            }
            
            // ingredients
            const tableIngredients = document.createElement("table");
            tableIngredients.setAttribute("class", "table");
            tableIngredients.innerHTML = `<caption>List of the recipe Ingredients</caption>
                                        <thead>
                                        <tr>
                                            <!--<th scope="col">#</th>-->
                                            <th scope="col">Name</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Metric</th>
                                        </tr>
                                        </thead>
                                        <tbody id="tbody">
                                        </tbody>
                                        `
            
            divIngredient.appendChild(tableIngredients);
            
            for (let i = 0; i < recipe.ingredients.length; i++) {
                const ingredient = recipe.ingredients[i];
                const $tr = document.createElement("tr");
                tableIngredients.appendChild($tr);
                $tr.innerHTML = `<td>${ingredient.name}</td>
                                 <td>${ingredient.quantity}</td>
                                 <td>${ingredient.metric}</td>
                                `;    
             
            }
           
        });

    });
});

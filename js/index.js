// DOM's Elements
const ulNav = document.querySelector("nav > ul");
const imgRecipe = document.querySelector("img");
const h1 = document.querySelector("h1");
const description = document.getElementById("description");

const overview = document.getElementById("overview");

const difficulty = document.getElementById("difficulty");
const cost = document.getElementById("cost");
const preparation = document.getElementById("preparation-time");
const cooking = document.getElementById("cooking-time");
const resting = document.getElementById("resting-time");

const divIngredient = document.getElementById("divIngredient");

const substractBtn = document.getElementById("substract");
const addBtn = document.getElementById("add");
let nbServing = document.getElementById("nb-serving");

// Cost recipes content
const cheap = "€";
const affordable = "€€";
const expensive ="€€€";

// Level recipes content
const easy = "<i class='fas fa-star'></i>";
const intermediate = "<i class='fas fa-star'></i><i class='fas fa-star'></i>";
const difficult ="<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>";


// --- Create each content for each recipe --- //
ajaxGet("http://localhost/cooking-recipes/data/recipes.json", reponse =>{
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
            //e.stopPropagation();
            divIngredient.innerHTML = "";
            imgRecipe.setAttribute("class", "img-fluid");
            imgRecipe.setAttribute("id", "img-featured");
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
            } else if (recipe.cost === "affordable"){
                cost.textContent = affordable;
            } else {
                cost.textContent = expensive;
            }

            if(recipe.difficulty === "easy"){
                difficulty.innerHTML = easy;
            } else if (recipe.difficulty === "intermediate"){
                difficulty.innerHTML = intermediate;
            } else {
                difficulty.innerHTML = difficult;
            }
            
            // ingredients

            const createTableIngredients = ()=>{

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
                                     <td class="quant">${ingredient.quantity * parseInt(nbServing.textContent)}</td>
                                     <td>${ingredient.metric}</td>
                                    `;
                }
            }

            createTableIngredients();

            // serving between 2 to 8 pers
            
            const substract = (button, nbpers)=>{
                button.addEventListener("click", e =>{
                    e.preventDefault();
                    divIngredient.innerHTML = "";
                    if(recipe.name === "Canelés bordelais" || recipe.name === "Moelleux au chocolat"){
                        substractBtn.style.disabled = true;
                        addBtn.style.disabled = true;
                    } else {

                        if(nbpers.textContent <= 2){
                            button.style.disabled = true;
                        } else {
                            divIngredient.innerHTML = "";
                            nbpers.textContent -- ;
                            console.log("substract");
                            createTableIngredients();
                        }
                    }
                    
                });
            }
            
            const add = (button, nbpers)=>{
                button.addEventListener("click", e =>{
                    //e.preventDefault();
                    if(recipe.name === "Canelés bordelais" || recipe.name === "Moelleux au chocolat"){
                        substractBtn.style.disabled = true;
                        addBtn.style.disabled = true;
                    } else {

                        if(nbpers.textContent >= 8){
                            button.style.disabled = true;
                        } else {
                            divIngredient.innerHTML = "";
                            nbpers.textContent ++ ;
                            console.log("add");
                            createTableIngredients();
                        }
                    }
                });
            }

            if(recipe.name === "Canelés bordelais" || recipe.name === "Moelleux au chocolat"){
                nbServing.textContent = 4;
                substractBtn.style.disabled = true;
                addBtn.style.disabled = true;
                divIngredient.innerHTML = "";
                createTableIngredients();
            } else {
                nbServing.textContent = 2;
                substract(substractBtn, nbServing);
                add(addBtn, nbServing);  
            }

        });

    });
});

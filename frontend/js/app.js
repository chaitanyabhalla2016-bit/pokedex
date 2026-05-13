import config from './config.js';
document.addEventListener('DOMContentLoaded', () => {
    const pokemonContent = document.querySelector('.pokemon-content');
    const addPokeBtn = document.querySelector('.add-poke-btn');
    const pNameVar = document.getElementById('pName');
    const pTypeVar = document.getElementById('pType');
    const pImageVar = document.getElementById('pImage');
    const pSpeciesVar = document.getElementById('pSpecies');
    const pColorVar = document.getElementById('pColor');
    let editingMode = false;
    let editingId = null;

    // const pokeCard = document.querySelectorAll('.poke-card');
    // pokeCard.forEach(pCard => {
    //     pCard.addEventListener('mouseover', () => {
    //         pCard.style.background = pCard.dataset.color;
    //     });
    // });

    pokemonContent.addEventListener('mouseover', (event) => {
        const pCard = event.target.closest('.poke-card');
        if (!pCard) return;
        pCard.style.background = pCard.dataset.color;
    });
    pokemonContent.addEventListener('mouseout', (event) => {
        const pCard = event.target.closest('.poke-card');
        if (!pCard) return;
        pCard.style.background = 'var(--bg-pikachu-subtle)';
    });

    document.querySelector('.year').textContent = new Date().getFullYear();
    async function getPokemon() {
        try {
            const defaultHoverColor = 'var(--bg-pikachu-subtle)';
            const chooseEmAllResponse = await fetch(`${config.apiUrl}${config.appName}`);
            if (!chooseEmAllResponse.ok) {
                alert('No Response from Backend.');
                const errorData = await chooseEmAllResponse.json();
                console.log(errorData.errorMessage);
                return;
            }
            const chooseEmAll = await chooseEmAllResponse.json();
            pokemonContent.innerHTML = "";
    
            if (chooseEmAll.length == 0) {
                pokemonContent.innerHTML = `<p class="lead bg-pikachu-subtle fw-medium p-2 text-pikachu-emphasis text-center">No pokemon captured yet. Gotta Catch'em all!</p>`;
            } else {
                chooseEmAll.forEach(pokemon => {
                    pokemonContent.innerHTML += `
                    <div class="col-6 mb-3 mb-2">
                        <div class="card poke-card bg-pikachu-subtle" data-color="${pokemon.pColor || defaultHoverColor}">
                        <div class="card-body d-flex">
                            <img src="${pokemon.pImage}" class="img-thumbnail img-fluid" height="200" width="200">
                            <div class="d-flex flex-column justify-content-center p-4">
                                <h5 class="card-title text-pikachu-emphasis">${pokemon.pName}</h5>
                                <p class="card-text text-pikachu-soft">${pokemon.pType}</p>
                                <p class="card-text text-pikachu-soft">${pokemon.pSpecies}</p>
                                <div class="d-flex gap-2">
                                    <button href="#" data-id="${pokemon._id}" data-pName="${pokemon.pName}" data-pType="${pokemon.pType}" data-pImage="${pokemon.pImage}" data-pSpecies="${pokemon.pSpecies}" data-pColor="${pokemon.pColor}" class="btn btn-success edit-poke-btn">Train Pokemon</button>
                                    <button href="#" data-id="${pokemon._id}" class="btn btn-danger delete-poke-btn">Release Pokemon</button>
                                </div>    
                            </div>    
                        </div>
                        </div>
                    </div>
                `
                });
            }
        } catch (error) {
            console.log(error.message);
            alert('Getting Pokemon from pokedex went wrong in the backend.');
        }
    }

    addPokeBtn.addEventListener('click', async () => {
        try {
            const pNameVal = pNameVar.value.trim();
            const pTypeVal = pTypeVar.value.trim();
            const pImageVal = pImageVar.value.trim();
            const pSpeciesVal = pSpeciesVar.value.trim();
            const pColorVal = pColorVar.value.trim();
            
            if (editingMode) {
                if (!pNameVal || !pTypeVal || !pImageVal || !pSpeciesVal || !pColorVal) {
                    alert("Can't evolve a Pokemon if not exist!!");
                    return;
                }
                const evolvePokemonResponse = await fetch(`${config.apiUrl}${config.appName}/${editingId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        pName: pNameVal,
                        pType: pTypeVal,
                        pImage: pImageVal,
                        pSpecies: pSpeciesVal,
                        pColor: pColorVal
                    })
                })
                if (!evolvePokemonResponse.ok) {
                    alert('Something went wrong. Check console for more info!');
                    errorData = await evolvePokemonResponse.json();
                    console.log(errorData.errorMessage);
                    return;
                }
                console.log('Pokemon Updated');
                pNameVar.value = "";
                pTypeVar.value = "";
                pImageVar.value = "";
                pSpeciesVar.value = "";
                pColorVar.value = "";
                addPokeBtn.textContent = "Gotta catch'em all";
                editingMode = false;
                editingId = null;
                getPokemon();
            } else {
                if (!pNameVal || !pTypeVal || !pImageVal || !pSpeciesVal || !pColorVal) {
                    alert("Can't store an empty pokemon in PokeDex. Catch'em first!");
                    return;
                }
                const catchPokemonResponse = await fetch(`${config.apiUrl}${config.appName}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        pName: pNameVal,
                        pType: pTypeVal,
                        pImage: pImageVal,
                        pSpecies: pSpeciesVal,
                        pColor: pColorVal
                        
                    })
                });
                if (!catchPokemonResponse.ok) {
                    alert('Something went wrong. Could not catch the Pokemon');
                    const errorData = await catchPokemonResponse.json();
                    console.log(errorData.errorMessage);
                    return;
                }
                console.log('Pokemon Captured');
                getPokemon();
            }
        } catch (error) {
            console.log(error.message);
            alert("Something went wrong in the backend!");
        }
    });

    pokemonContent.addEventListener('click', async (event) => {
        try {
            if (event.target.classList.contains('edit-poke-btn')){
                addPokeBtn.textContent = 'Evolve Pokemon';
                pNameVar.value = event.target.dataset.pname;
                pTypeVar.value = event.target.dataset.ptype;
                pImageVar.value = event.target.dataset.pimage;
                pSpeciesVar.value = event.target.dataset.pspecies;
                pColorVar.value = event.target.dataset.pcolor;
                editingMode = true;
                editingId = event.target.dataset.id;
            }
            if (event.target.classList.contains('delete-poke-btn')) {
                const releasePokemonResponse = await fetch(`${config.apiUrl}${config.appName}/${event.target.dataset.id}`, {
                    method:"DELETE"
                });
                if (!releasePokemonResponse.ok) {
                    alert('Something Went Wrong');
                    const errorData = await releasePokemonResponse.json();
                    console.log(errorData.errorMessage);
                    return;
                }
                console.log("Pokemon released successfully!");
                getPokemon();
            }
        } catch (error) {
            alert('Something wrong went in the backend!');
            console.log(error.message);
        }
        
    })

    getPokemon();
});

const pokedex = document.getElementById("pokedex");

async function requisitaPokemons() {
    pokedex.innerHTML="";
    for (let i = 1; i<=150; i++) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then((response) => response.json())
    .then((data) => {
        displayPokemon(data);
    });
}
};

requisitaPokemons();
function concatenarTipos(final, tipo){
    if (final == ""){
        return tipo.type.name;
    }
    return ` ${final} , ${tipo.type.name}`;
}

const displayPokemon = (pokemon) => {
    const tipos = pokemon.types.reduce(concatenarTipos,"");    
    let pokemonHTMLString = `<li class="card"> <img class="card-img" src="${pokemon.sprites.front_default}"/> <h2 class="card-titulo">${pokemon.name}</h2>
        <p class="card-legenda"> Type:${tipos}</p> </li>`;
        pokedex.innerHTML += pokemonHTMLString; 
    };
    
function searchPokemon() {
    const pesquisa = document.getElementById("pokemonsearch")
    fetch(`https://pokeapi.co/api/v2/pokemon/${pesquisa.value}`)
    .then((response) => response.json())
    .then((pokemon) => {
        const tipos = pokemon.types.reduce(concatenarTipos,"");    
    let pokemonHTMLString = `<li class="card"> <img class="card-img" src="${pokemon.sprites.front_default}"/> <h2 class="card-titulo">${pokemon.name}</h2>
        <p class="card-legenda"> Type:${tipos}</p> </li>`;
        pokedex.innerHTML = pokemonHTMLString; 
    });

}

const pokemonsearch = document.getElementById("pokemonsearch")
pokemonsearch.addEventListener( 'keypress', preventEnter, false );

function preventEnter(evt) {
    var charCode = evt.charCode; console.log(charCode);
    if (charCode == 13 && pokemonsearch.value !== "") {
        evt.preventDefault();
        searchPokemon();
        return;
    }
}
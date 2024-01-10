
// POKEMONS
let dades;

// ARRAYS
let pokemons = [], municipis = [], meteorits = [], movies = [];
// POKEMONS
fetch("js/data/pokemon.json")
	.then((response) => response.json())
	.then((data) => {
		dades = data.pokemon;

		console.log(dades)
		for (let i in dades) {
			console.log(dades[i].name)
			pokemons.push(dades[i].name)
		}
	});



// // MUNICIPIS
// fetch("js/data/municipis.json")
// 	.then((response) => response.json())
// 	.then((data) => {
// 		dades = data.elements;

// 		console.log(dades)
// 		for (let i in dades) {
// 			console.log(dades[i].municipi_nom)
// 			municipis.push(dades[i].municipi_nom)
// 		}
// 	});



// // METEORITS
// fetch("js/data/earthMeteorites.json")
// 	.then((response) => response.json())
// 	.then((data) => {
// 		dades = data;

// 		console.log(dades)
// 		for (let i in dades) {
// 			console.log(dades[i].name)
// 			meteorits.push(dades[i].name)
// 		}
// 	});


// // MOVIES
// fetch("js/data/movies.json")
// 	.then((response) => response.json())
// 	.then((data) => {
// 		dades = data.movies;

// 		console.log(dades)
// 		for (let i in dades) {
// 			console.log(dades[i].title)
// 			movies.push(dades[i].title)
// 		}
// 	});


function orderList(ordre) {
	if (ordre == "asc") {
		pokemons.sort();
	} else if (ordre == "desc"){
		pokemons.reverse();
	}
	console.log(pokemons)
}

function searchList(index) {
	index = parseInt(prompt("introdueix un index per buscar a l'array [0 - " + pokemons.length + "]"));
	if (isNaN(index)) {
		console.log("No has introduït cap número.");
		return;
	}
	console.log("Pokémon amb índex número " + index + ": " + pokemons[index]);
}

function arrayMultidimensional() {
	const allPokemonArray = pokemons.map(pokemon => ({
		id: pokemon.id,
		name: pokemon.name,
		img: pokemon.img,
		weight: pokemon.weight
	  }));
	  
	  console.log(allPokemonArray);
}


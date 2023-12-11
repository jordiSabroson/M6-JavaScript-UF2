
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



// MUNICIPIS
fetch("js/data/municipis.json")
	.then((response) => response.json())
	.then((data) => {
		dades = data.elements;

		console.log(dades)
		for (let i in dades) {
			console.log(dades[i].municipi_nom)
			municipis.push(dades[i].municipi_nom)
		}
	});



// METEORITS
fetch("js/data/earthMeteorites.json")
	.then((response) => response.json())
	.then((data) => {
		dades = data;

		console.log(dades)
		for (let i in dades) {
			console.log(dades[i].name)
			meteorits.push(dades[i].name)
		}
	});


// MOVIES
fetch("js/data/movies.json")
	.then((response) => response.json())
	.then((data) => {
		dades = data.movies;

		console.log(dades)
		for (let i in dades) {
			console.log(dades[i].title)
			movies.push(dades[i].title)
		}
	});


function orderList(ordre) {
	if (ordre == "asc") {
		return po
	}
}
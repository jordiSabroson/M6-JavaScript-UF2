
// POKEMONS
let dades;

// ARRAYS
let pokemons = [], municipis = [], meteorits = [], movies = [], llista = [];
// POKEMONS
fetch("js/data/pokemon.json")
	.then((response) => response.json())
	.then((data) => {
		dades = data.pokemon;

		//console.log(dades)
		for (let i in dades) {
			//console.log(dades[i].name)
			pokemons.push(dades[i].name)
		}

		dades.forEach((pokemon) => {
			let pokemonSenseKG = parseFloat(pokemon.weight);
			llista.push([pokemon.id, pokemon.name, pokemon.img, pokemonSenseKG]);
		});
		console.log(llista);
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
	} else if (ordre == "desc") {
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

function calcMitjana() {
	let pesTotal = 0, c = 0;
	dades.forEach((pokemon) => {
		pesTotal += parseFloat(pokemon.weight);
		c++;
	});
	let mitjana = pesTotal / c;
	alert(mitjana.toFixed(2));
}

function printList() {
	let div = document.getElementById("resultat");
	let table = document.createElement("table");
	let tbody = document.createElement("tbody");
	
	let filaTitols = document.createElement("tr");
	let titols = ["ID", "Nom", "Imatge", "Pes"];
	titols.forEach(titol => {
		let th = document.createElement("th");
		th.textContent = titol;
		filaTitols.appendChild(th);
	});
	tbody.appendChild(filaTitols);

	llista.forEach((filaDades => {
		let fila = document.createElement("tr");
		filaDades.forEach((dades) => {
			let casella = document.createElement("td");
			casella.textContent = dades;
			fila.appendChild(casella);
		});
		tbody.appendChild(filaTitols);
	}))

	table.appendChild(tbody);
	div.appendChild(table);
	table.setAttribute("border", "1");
	document.body.appendChild(table);
	llista.forEach((pokemon) => {

	})

}
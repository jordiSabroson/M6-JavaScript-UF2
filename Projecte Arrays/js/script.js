// Variables que s'utilitzen per emmagatzemar les dades dels JSONs
let dades = null;
let llista = [];
let noms = [];
let bbdd;

// Arrays que s'utilitzen per visualitzar els gràfics
let arrayLabels = [], arrayDadesGraf = [], backgroundColor = [], borderColor = [];

function triarJSON() {
	event.preventDefault();
	dades = null;
	llista = [];
	noms = [];
	console.clear();
	let valor = document.querySelector('input[value="pokemons"]:checked') ||
		document.querySelector('input[value="municipis"]:checked') ||
		document.querySelector('input[value="meteorits"]:checked') ||
		document.querySelector('input[value="movies"]:checked');

	bbdd = valor.value;
	if (bbdd == "pokemons") {
		// POKEMONS
		fetch("js/data/pokemon.json")
			.then((response) => response.json())
			.then((data) => {
				dades = data.pokemon;

				// Bucle per guardar els noms dels pokemons a un array
				for (let i in dades) {
					noms.push(dades[i].name)
				}
				console.log("Noms dels pokemons: " + noms.join(", "));

				// Codi per guardar en un array anomenat "llista" només certes dades per mostrar en una taula al DOM
				dades.forEach((pokemon) => {
					let pokemonSenseKG = parseFloat(pokemon.weight);
					llista.push([pokemon.id, pokemon.name, pokemon.img, pokemonSenseKG]);
				});

				// Imprimir l'array anterior en forma de taula per consola
				//console.table(llista);

				// Arrays pel gràfic
				for (let i in dades) {
					if (!arrayLabels.includes(dades[i].type))
					arrayLabels.push(dades[i].type)
				}
				console.log(arrayLabels);
			});

	} else if (bbdd == "municipis") {
		// MUNICIPIS
		fetch("js/data/municipis.json")
			.then((response) => response.json())
			.then((data) => {
				dades = data.elements;

				for (let i in dades) {
					noms.push(dades[i].municipi_nom)
				}
				console.log("Noms dels municipis: " + noms.join(", "));
				dades.forEach((municipi) => {
					llista.push([municipi.ine, municipi.municipi_nom, municipi.municipi_bandera]);
				});
				console.table(llista);
			});
	} else if (bbdd == "meteorits") {
		// METEORITS
		fetch("js/data/earthMeteorites.json")
			.then((response) => response.json())
			.then((data) => {
				dades = data;
				for (let i in dades) {
					noms.push(dades[i].name)
				}
				console.log("Noms dels meteorits: " + noms.join(", "));

				dades.forEach((meteorit) => {
					llista.push([meteorit.id, meteorit.name, meteorit.mass]);
				});
				console.table(llista);
			});
	} else if (bbdd == "movies") {
		// MOVIES
		fetch("js/data/movies.json")
			.then((response) => response.json())
			.then((data) => {
				dades = data.movies;

				for (let i in dades) {
					noms.push(dades[i].title)
				}
				console.log("Noms de les pel·lícules: " + noms.join(", "));

				dades.forEach((movies) => {
					llista.push([movies.title, movies.rating, movies.url, movies.year]);
				});
				console.table(llista);
			});
	}
}


function orderList(ordre) {
	if (ordre == "asc") {
		noms.sort();
	} else if (ordre == "desc") {
		noms.reverse();
	}
	console.log(noms)
}

function searchList(index) {
	index = parseInt(prompt("introdueix un index per buscar a l'array [0 - " + noms.length + "]"));
	if (isNaN(index)) {
		console.log("No has introduït cap número.");
		return;
	}
	console.log("Element número " + index + ": " + noms[index]);
}

function calcMitjana() {
	let total = 0, c = 0;
	if (bbdd == "pokemons") {
		dades.forEach((item) => {
			total += parseFloat(item.weight);
			c++;
		});
	} else if (bbdd == "municipis") {
		alert("No hi ha valors amb els que calcular una mitjana!");
		return;
	} else if (bbdd == "meteorits") {
		dades.forEach((item) => {
			if (item.mass != undefined) {
				total += parseFloat(item.mass);
				c++;
			}
		});
	} else if (bbdd == "movies") {
		dades.forEach((item) => {
			total += parseFloat(item.rating);
			c++;
		});
	}
	let mitjana = total / c;
	alert("Mitjana: " + mitjana.toFixed(2));
}

function printList() {
	if (dades == null) {
		alert("Selecciona una base de dades abans!");
	} else {
		let div = document.getElementById("resultat");
		div.innerHTML = "";
		let table = document.createElement("table");
		let tbody = document.createElement("tbody");
		let filaTitols = document.createElement("tr");
		let titols = ["ID", "NOM", "IMATGE", "PES"];
		titols.forEach(titol => {
			let th = document.createElement("th");
			th.textContent = titol;
			filaTitols.appendChild(th);
		});
		tbody.appendChild(filaTitols);

		for (let item of llista) {
			let fila = document.createElement("tr");

			// ID
			let casellaID = document.createElement("td");
			casellaID.textContent = item[0];
			fila.appendChild(casellaID);

			// Nom
			let casellaNom = document.createElement("td");
			casellaNom.textContent = item[1];
			fila.appendChild(casellaNom);

			// Imatge
			//let img = document.createElement("img");
			let casellaImatge = document.createElement("td");
			casellaImatge.innerHTML = "<img src='" + item[2] + "'></img>";

			//casellaImatge.appendChild(img);
			fila.appendChild(casellaImatge);

			// Pes
			let casellaPes = document.createElement("td");
			casellaPes.textContent = item[3];
			fila.appendChild(casellaPes);

			tbody.appendChild(fila);
		}

		table.appendChild(tbody);
		div.appendChild(table);
		document.body.appendChild(div);
	}
}


// GRÀFIC
function grafic() {
let myChart = new Chart(
	document.getElementById('myChart'),
	config
);

const config = {
	type: 'polarArea',
	data: data,
	options: {}
  };

const data = {
	labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
	datasets: [{
		label: 'My First Dataset',
		data: [11, 16, 7, 3, 14],
		backgroundColor: [
			'rgb(255, 99, 132)',
			'rgb(75, 192, 192)',
			'rgb(255, 205, 86)',
			'rgb(201, 203, 207)',
			'rgb(54, 162, 235)'
		],
	borderColor: []
	}]
};
}

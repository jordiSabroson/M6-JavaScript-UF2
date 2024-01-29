// Variables que s'utilitzen per emmagatzemar les dades dels JSONs
let dades = null;	// Array on van totes les dades recuperades del JSON
let llista = [];	// Array que emmagatzema les dades seleccionades per mostrar al DOM
let noms = [];		// Array que només emmagatzema els noms dels elements dels arrays (ex 1)
let bbdd;			// Variable per seleccionar el JSON

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
					llista.push([municipi.grup_ajuntament.codi_postal, municipi.municipi_nom, municipi.municipi_bandera, municipi.nombre_habitants]);
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
					llista.push([meteorit.id, meteorit.name, meteorit.mass, meteorit.year]);
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
	let numColumna;
	if (bbdd == "movies") {
		numColumna = 0;
	} else {
		numColumna = 1;
	}
	let llistaOrdenada = [...llista];

	llistaOrdenada.sort((a, b) => {
		let compararValorA = String(a[numColumna] || '').toLowerCase();
		let compararValorB = String(b[numColumna] || '').toLowerCase();
		return ordre === 'asc' ? compararValorA.localeCompare(compararValorB) : compararValorB.localeCompare(compararValorA);
	});

	console.table(llistaOrdenada);
	llista = llistaOrdenada;
	printList();
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
		dades.forEach((item) => {
			total += parseFloat(item.nombre_habitants);
			c++;
		});
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
	if (isNaN(mitjana)) {
		alert("Selecciona una base de dades abans!");
	} else {
		alert("Mitjana: " + mitjana.toFixed(2));
	}
}

function printList() {
	if (dades == null) {
		alert("Selecciona una base de dades abans!");
	} else {
		let titols;
		document.getElementById("canvas").innerHTML = "";
		if (myChart) {
			myChart.destroy();
		}
		let div = document.getElementById("resultat");
		div.innerHTML = "";
		let table = document.createElement("table");
		table.id = "taula";
		let tbody = document.createElement("tbody");
		let filaTitols = document.createElement("tr");
		if (bbdd == "pokemons") {
			titols = ["ID", "NOM", "IMATGE", "PES"];
		} else if (bbdd == "municipis") {
			titols = ["CODI POSTAL", "NOM", "BANDERA", "NOMBRE D'HABITANTS"];
		} else if (bbdd == "meteorits") {
			titols = ["ID", "NOM", "MASSA", "ANY DE CAIGUDA"];
		} else if (bbdd == "movies") {
			titols = ["TÍTOL", "PUNTUACIÓ", "PORTADA", "ANY"];
		}
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
			let casellaImatge = document.createElement("td");
			if (bbdd == "meteorits") {
				casellaImatge.textContent = item[2];
			} else {
				casellaImatge.innerHTML = "<img alt='Imatge no disponible' src='" + item[2] + "'></img>";
			}

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
let myChart = null;
function grafic() {
	document.getElementById("resultat").innerHTML = "";
	let grafic = document.createElement("canvas");
	grafic.id = "myChart";
	let canvas = document.getElementById("canvas");
	canvas.appendChild(grafic);
	let data = {
		labels: [],
		datasets: [{
			label: '',
			data: [],
			backgroundColor: [
				getBackgroundColor(),
				getBackgroundColor(),
				getBackgroundColor(),
				getBackgroundColor(),
				getBackgroundColor()
			],
			borderColor: getBorderColor()
		}]
	};
	let config = {
		type: 'polarArea',
		data: data,
		options: {}
	};


	let graficMap = new Map();
	if (bbdd == "pokemons") {
		//Pokemons
		dades.forEach((pokemon) => {
			pokemon.type.forEach((tipus) => {
				if (!graficMap.has(tipus)) {
					graficMap.set(tipus, 0);
				}
				graficMap.set(tipus, graficMap.get(tipus) + 1);
			});
		});
		graficMap.forEach(function (value, key) {
			data.labels.push(key);
			data.datasets[0].data.push(value);
		});
	} else if (bbdd == "municipis") {
		dades.forEach((municipi) => {
			if (!graficMap.has(municipi.grup_comarca.comarca_nom)) {
				graficMap.set(municipi.grup_comarca.comarca_nom, 0);
			}
			graficMap.set(municipi.grup_comarca.comarca_nom, graficMap.get(municipi.grup_comarca.comarca_nom) + 1);
		});
		graficMap.forEach(function (value, key) {
			data.labels.push(key);
			data.datasets[0].data.push(value);
		});
	} else if (bbdd == "meteorits") {
		dades.forEach((meteorit) => {
			if (!graficMap.has(meteorit.fall)) {
				graficMap.set(meteorit.fall, 0);
			}
			graficMap.set(meteorit.fall, graficMap.get(meteorit.fall) + 1);
		});
		graficMap.forEach(function (value, key) {
			data.labels.push(key);
			data.datasets[0].data.push(value);
		});
	} else if (bbdd == "movies") {
		dades.forEach((movies) => {
			movies.genres.forEach((genere) => {
				if (!graficMap.has(genere)) {
					graficMap.set(genere, 0);
				}
				graficMap.set(genere, graficMap.get(genere) + 1);
			});
		});
		graficMap.forEach(function (value, key) {
			data.labels.push(key);
			data.datasets[0].data.push(value);
		});
	}

	function getBackgroundColor() {
		let r = getRandomNumber(0, 255);
		let g = getRandomNumber(0, 255);
		let b = getRandomNumber(0, 255);
		let opacity = 0.2;
		return `rgba(${r},${g},${b},${opacity})`;
	}

	function getBorderColor() {
		let color = getBackgroundColor();
		let opacity = 1;
		return `${color},${opacity})`;
	}

	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	if (myChart) {
		myChart.destroy();
	}

	myChart = new Chart(
		document.getElementById('myChart'),
		config
	);
}

// Exercici 3
document.addEventListener('DOMContentLoaded', function() {
    let inputSearch = document.getElementById('txtSearch');
    inputSearch.addEventListener('input', (e) => {
		let valorInput = inputSearch.value.toLowerCase();
		
    });
});
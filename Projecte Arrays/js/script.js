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
	let table = document.getElementById("taula");
	let tbody = table.getElementsByTagName("tbody")[0];
	let rows = [].slice.call(tbody.getElementsByTagName("tr"));
	if (ordre == "asc") {
		rows.sort(function (a, b) {
			let aText = a.cells[1].textContent.trim();
			let bText = b.cells[1].textContent.trim();
			return aText.localeCompare(bText);
		});

		// Elimina las filas existentes de la tabla, excepto la primera (encabezados)
		for (let i = tbody.children.length - 1; i > 0; i--) {
			tbody.removeChild(tbody.children[i]);
		}

		// Agrega las filas ordenadas a la tabla
		rows.forEach(function (row) {
			tbody.appendChild(row);
		});
		noms.sort();
		console.log(noms);
	} else if (ordre == "desc") {
		rows.sort(function (a, b) {
			let aText = a.cells[1].textContent.trim();
			let bText = b.cells[1].textContent.trim();
			// Invierte el resultado de la comparación
			return -aText.localeCompare(bText);
		});

		// Elimina las filas existentes de la tabla, excepto la primera (encabezados)
		for (let i = tbody.children.length - 1; i > 0; i--) {
			tbody.removeChild(tbody.children[i]);
		}

		// Agrega las filas ordenadas a la tabla
		rows.forEach(function (row) {
			tbody.appendChild(row);
		});
		noms.reverse();
		console.log(noms);
	}
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
		if (myChart) {
			myChart.destroy();
		}
		let div = document.getElementById("resultat");
		div.innerHTML = "";
		let table = document.createElement("table");
		table.id = "taula";
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
let myChart = null;
function grafic() {
	document.getElementById("resultat").innerHTML = "";

	const data = {
			labels: [],
			datasets: [{
				label: '',
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
	const config = {
		type: 'polarArea',
		data: data,
		options: {}
	};

	
	let grafMap = new Map();
	if (bbdd == "pokemons") {
		//Pokemons
		dades.forEach((pokemon) => {
			pokemon.type.forEach((type) => {
				if (!grafMap.has(type)) {
					grafMap.set(type, 0);
				}
				grafMap.set(type, grafMap.get(type) + 1);
			});
		});
		grafMap.forEach(function (value, key) {
			data.labels.push(key);
			data.datasets[0].data.push(value);
		});
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
	let inputSearch = document.getElementById("txtSearch");
    let table = document.getElementById("taula");

    inputSearch.addEventListener('input', function (e) {
        let searchTerm = inputSearch.value.trim().toLowerCase();

        // Obtén todas las filas de la tabla
        let rows = table.getElementsByTagName('tr');

        // Itera sobre las filas (ignorando la primera fila de encabezados)
        for (let i = 1; i < rows.length; i++) {
            let row = rows[i];
            let visible = false;

            // Itera sobre las celdas de la fila
            for (let j = 0; j < row.cells.length; j++) {
                let cellText = row.cells[j].textContent.trim().toLowerCase();

                // Verifica si el texto de la celda contiene la búsqueda
                if (cellText.includes(searchTerm)) {
                    visible = true;
                    break; // No es necesario seguir revisando las otras celdas si ya encontramos una coincidencia
                }
            }

            // Muestra u oculta la fila según si coincide con la búsqueda
            row.style.display = visible ? '' : 'none';
        }
    });
});
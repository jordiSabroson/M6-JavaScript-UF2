class Cicle {

    constructor(nom, categoria, numAlumnes, abreviatura) {
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.numEdicions = 0;
        this.ultimaEdicio = null;
        this.moduls = [];
    }

    setNumEdicions() {
        this.numEdicions++;
        this.ultimaEdicio = new Date();
    }

    afegirModul(modul) {
        this.moduls.push(modul);
    }

    toString() {
        this.moduls.sort((a, b) => a.num - b.num);
        let modulsStr = this.moduls.map(modul => `  - ${modul.nom} (Num: ${modul.num}, Hores: ${modul.hores})`).join('\n');
        return `Cicle:
          Nom: ${this.nom}
          Categoria: ${this.categoria}
          Num d'alumnes: ${this.numAlumnes}
          Abreviatura: ${this.abreviatura}
          Num d'edicions: ${this.numEdicions}
          Última edició: ${this.ultimaEdicio ? this.ultimaEdicio.toLocaleString() : 'Encara no s\'ha editat'};
        Mòduls:
${modulsStr} `;
    }

    calculHores() {
        let hores = 0;
        this.moduls.forEach(function (modul){
            hores += parseInt(modul.modul_hores);
        })
        console.log("Hores del mòdul: " + hores)
        alert("Hores del mòdul: " + hores)
    }
}

function afegirModulAlCicle(cicle, modul) {
    cicle.afegirModul(modul);
}

export default Cicle;
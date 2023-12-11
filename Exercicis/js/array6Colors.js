/*
 * Crea una funció JavaScript que crei un array de 6 colors per nom (‘verd’, ‘vermell’, ‘groc’, 
 * ‘blau’, ‘negre’, ‘blanc’) i que: 
 */

function array6colors() {
    let colors = ['verd', 'vermell', 'groc', 'blau', 'negre', 'blanc'];
    
    document.write("Array original: " + colors + "<br>");
    // Digui si tots els colors són menors que ‘marró’
    function menorQueMarro(color) {
        return color > 'marró';
    }
    document.write("Digui si tots els colors són menors que ‘marró’: " + colors.every(menorQueMarro) + "<br>");

    // et torni els colors que són menors que ‘marró’
    document.write("et torni els colors que són menors que ‘marró’: " + colors.filter(menorQueMarro) + "<br>");

    // et torni els darrers 2 colors (independentment de quants hi hagin abans)
    document.write("et torni els darrers 2 colors (independentment de quants hi hagin abans): " + colors.pop() + ", " + colors.pop() + "<br>");

    // afegeixi el color ‘turquesa’
    colors.push('turquesa');
    document.write("afegeixi el color ‘turquesa’: " + colors + "<br>");

    // elimini el color ‘verd’
    let index;
    for (let i = 0; i < colors.length; i++) {
        if (colors[i] == 'verd') {
            index = i;
        }
    }
    colors.splice(index, index+1);
    document.write("elimini el color ‘verd’: " + colors);
}


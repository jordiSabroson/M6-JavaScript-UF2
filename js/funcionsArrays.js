/* 
 * Crea una funció JavaScript que mostri per pantalla un exemple de cada una de les funcions de Arrays amb:
 *      Array inicial → còpia del mètode i els paràmetres utilitzats → resultat al executar-lo
 */

function funcionsArrays() {
    // Array d'exemple
    let array = ['hola', 'salutacions', 'benaventurat', 'uep', 'com va', 'que pasa', 'osti', 'pilotes'];
    let array2 = ['un', 'dos'];
    document.write("Array d'exemple: " + array + "<br>");

    // at() Returns an indexed element of an array
    document.write("at(): " + array.at(1) + "<br>");

    // concat() Joins arrays and returns an array with the joined arrays
    document.write("concat(): " + array.concat(array2) + "<br>");

    // constructor Returns the function that created the Array object's prototype
    arr = new Array('1','2');
    document.write("constructor: " + arr + "<br>");

    // copyWithin() Copies array elements within the array, to and from specified positions
    document.write("copyWithin(): " + array.copyWithin(0,4) + "<br>");

    // entries() Returns a key/value pair Array Iteration Object
    let iterador = array.entries();
    document.write("entries(): " + iterador.next().value + "<br>");
}
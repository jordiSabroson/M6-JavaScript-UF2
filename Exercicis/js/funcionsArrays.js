/* 
 * Crea una funció JavaScript que mostri per pantalla un exemple de cada una de les funcions de Arrays amb:
 *      Array inicial → còpia del mètode i els paràmetres utilitzats → resultat al executar-lo
 */

function funcionsArrays() {
    // Array d'exemple
    let array = ['hola', 'salutacions', 'benaventurat', 'uep', 'com va', 'que pasa', 'osti', 'pilotes'];
    let array2 = ['un', 'dos', ['tres', 'quatre']];
    document.write("<b>Array d'exemple: </b>" + array + "<br>");
    document.write("<b>Array d'exemple 2: </b>" + array2 + "<br>" + "<br>");

    // at() Returns an indexed element of an array
    document.write("at(1): " + array.at(1) + "<br>");

    // concat() Joins arrays and returns an array with the joined arrays
    document.write("concat(array2): " + array.concat(array2) + "<br>");

    // constructor Returns the function that created the Array object's prototype
    arr = new Array('1', '2');
    document.write("constructor: arr = new Array('1', '2'); : " + arr + "<br>");

    // copyWithin() Copies array elements within the array, to and from specified positions
    document.write("copyWithin(0, 4): " + array.copyWithin(0, 4) + "<br>");

    // entries() Returns a key/value pair Array Iteration Object
    let iterador = array.entries();
    document.write("entries(): let iterador = array.entries(): " + iterador.next().value + "<br>");

    // every() Checks if every element in an array pass a test
    function menorQuePatata(paraula) { return paraula < 'patata'; }
    document.write("<b>Funció booleana:</b> function menorQuePatata(paraula){return paraula < 'patata';}" + "<br>");
    document.write("every(menorQuePatata): " + array.every(menorQuePatata) + "<br>");

    // fill() Fill the elements in an array with a static value
    document.write("fill(0, 2, 4): " + array.fill(0, 2, 4) + "<br>");

    // filter() Creates a new array with every element in an array that pass a test
    document.write("filter(menorQuePatata): " + array.filter(menorQuePatata) + "<br>");

    // find() Returns the value of the first element in an array that pass a test
    document.write("find(menorQuePatata): " + array.find(menorQuePatata) + "<br>");

    // findIndex() Returns the index of the first element in an array that pass a test
    document.write("findIndex(menorQuePatata): " + array.findIndex(menorQuePatata) + "<br>");

    // flat() Concatenates sub-array elements
    document.write("flat(): " + array2.flat() + "<br>");

    // flatMap() Maps all array elements and creates a new flat array
    document.write("flatMap((p) => (p == hola ? [dew, 2] : 1)): " + array.flatMap((p) => (p === 'com va' ? ['dew', 2] : 1)) + "<br>");

    // forEach() Calls a function for each array element
    console.log("ForEach:")
    array.forEach(function (item) { console.log(item); })
    document.write("forEach(item): veure consola <br>");

    // from() Creates an array from an object
    document.write("from('huola'): " + Array.from('huola') + "<br>");

    // includes() Check if an array contains the specified element
    document.write("includes('pilotes'): " + array.includes('pilotes') + "<br>");

    // indexOf() Search the array for an element and returns its position
    document.write("indexOf('pilotes'): " + array.indexOf('pilotes') + "<br>");

    // isArray() Checks whether an object is an array
    document.write("isArray([1, 3, 5]): " + Array.isArray([1, 3, 5]) + "<br>");

    // join() Joins all elements of an array into a string
    document.write("join('-'): " + array.join('-') + "<br>");

    // keys() Returns a Array Iteration Object, containing the keys of the original array
    iterador = array.keys();
    console.log("KEYS:");
    for (let key of iterador) {
        console.log(key);
    }
    document.write("keys(): iterador = array.keys(); veure consola <br>");

    // lastIndexOf() Search the array for an element, starting at the end, and returns its position
    document.write("lastIndexOf(): " + array.lastIndexOf('com va') + "<br>");

    // length Sets or returns the number of elements in an array
    document.write("length: " + array.length + "<br>");

    // map() Creates a new array with the result of calling a function for each array element
    document.write("map(function(element) {return element.length;}): " + array.map(function (element) { return element.length; }) + "<br>");

    // pop() Removes the last element of an array, and returns that element
    document.write("pop(): " + array.pop() + "<br>");

    // prototype Allows you to add properties and methods to an Array object
    document.write("prototype: " + "<br>");

    // push() Adds new elements to the end of an array, and returns the new length
    document.write("push('tobogan'): " + array.push('tobogan') + "<br>");

    // reduce() Reduce the values of an array to a single value (going left-to-right)
    let resultat = array.reduce(function (acumulador, element) {
        return acumulador + ' ' + element;
    }, '');
    document.write("reduce(): " + resultat + "<br>");

    // reduceRight() Reduce the values of an array to a single value (going right-to-left)
    resultat = array.reduceRight(function (acumulador, element) {
        return acumulador + ' ' + element;
    }, '');
    document.write("reduceRight(): " + resultat + "<br>");

    // reverse() Reverses the order of the elements in an array
    document.write("reverse(): " + array.reverse() + "<br>");

    // shift() Removes the first element of an array, and returns that element
    document.write("shift(): " + array.shift() + "<br>");

    // slice() Selects a part of an array, and returns the new array
    document.write("slice(1,3): " + array.slice(1, 3) + "<br>");

    // some() Checks if any of the elements in an array pass a test
    resultat = array.some(function (element) {
        return element.length > 5;
    });
    document.write("some(array.some(function (element){return element.length > 5;}) " + resultat + "<br>");

    // sort() Sorts the elements of an array
    document.write("sort(): " + array.sort() + "<br>");

    // splice() Adds/Removes elements from an array
    document.write("splice(2,1,'patata'): " + array.splice(2, 1, 'patata') + "<br>");

    // toString() Converts an array to a string, and returns the result
    document.write("toString(): " + array.toString() + "<br>");

    // unshift() Adds new elements to the beginning of an array, and returns the new length
    document.write("unshift(): " + array.unshift('conchita') + "<br>");

    // valueOf() Returns the primitive value of an array
    document.write("valueOf(): " + array.valueOf() + "<br>");
}
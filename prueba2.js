// ==========================================
// EJERCICIOS DE REPASO
// ==========================================

//1. Tipos de datos (typeof)
// Crea un array con un string, un number, un boolean, null, undefined y una function.
// Recorre el array e imprime el tipo de cada elemento.
// Pista: fíjate qué tipo devuelve typeof null.

const array = ["hola", 54, true, null, undefined, arrancar()]
for (let index = 0; index < array.length; index++) {
    console.log((typeof array[index]));
    
}



//2. BigInt
// Declara dos BigInt, súmalos, multiplícalos y calcula el resto de la división (%).
// Intenta sumar uno de ellos con un number normal sin convertirlo antes y observa qué ocurre.
let num1 = 50n
let num2 = 5555n
console.log(num1 + num2)
console.log(num1 * num2)
console.log(num1 % num2)
console.log(num1 + 2)


//3.1 Rest params
// Escribe una función maximo(...nums) que devuelva el valor más alto usando rest params.



//3.2 Spread
// Usa spread para combinar dos arrays de objetos en uno solo.
// Usa spread para copiar un objeto añadiéndole una propiedad nueva sin modificar el original.



//4. Objetos, defineProperty y delete
// Crea un objeto "persona" con nombre, apellido y un getter "nombreCompleto"
// definido con Object.defineProperty.
// Añade también un getter "edadEnMeses" a partir de una propiedad "edad".
// Comprueba con Object.keys(persona) si el getter aparece listado.
// Borra una propiedad normal con delete y confirma que ha desaparecido.



//5.1 for...of con entries()
// Imprime cada elemento de un array de nombres junto a su posición.



//5.2 for...in con Object.hasOwn
// Recorre un objeto "producto" e imprime solo sus propiedades propias.



//5.3 map()
// Convierte un array de precios en euros a dólares (multiplicando por un cambio ficticio).



//5.4 filter()
// Quédate solo con los números pares de un array.



//5.5 while
// Imprime la tabla de multiplicar del 7 hasta el 10.



//5.6 do...while
// Suma los números del 1 al 10, pero solo los múltiplos de 3.



//6. DOM
//6.1 Selecciona todos los elementos con clase .card y cambia su borde a "2px solid black".



//6.2 Selecciona el primer <li> de una lista con id "menu" y cámbiale el color de texto.



//6.3 Selecciona todos los <a> de la página y añádeles "text-decoration: underline".
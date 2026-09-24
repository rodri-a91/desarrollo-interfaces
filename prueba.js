//1
const datos = ["hola", 12,{}]

for (const dato of datos) {
    console.log(typeof dato)
}

//2
const num = 100
const big = 50n

console.log(num*2)
console.log(big*2n)
console.log(BigInt(num)+big)

//3
//Expansión (descomprensión)
const numerosIniciales = [10,20,30]
const nuevo = [0, ...numerosIniciales, 40,50]
console.log(nuevo)

//Agrupación (comprensión)
function sumarTodos (...nums){
    let suma = 0
    for (let index = 0; index < nums.length; index++) {
        suma += nums[i]
    }
    return suma
}

console.log(sumarTodos(5,10,15,20))

//4
const coche = {
    marca: "Toyota",
    precio: 20000,
    motor: {
        tipo: "gasolina",
        potencia: 150
    },
    arrancar(){
        console.log("El coche arranca")
    }
}

coche.color = "rojo"

Object.defineProperty(coche, 'precioIVA', {
    get() {
        return this.precio * 1.21
    }
    
})

delete coche.motor
coche.arrancar()
console.log(coche.precioIVA)

//5
for (index = 1; index < 11; index++) {
    console.log(index);
}

const frutas = ["manzana", "pera", "plátano"]
for (const element of object) {
    console.log(element)
}

const colores = ["rojo", "verde", "azul"]
for (const [indice, color] of colores.entries) {
    console.log(`Posición ${indice}: ${color}`)
}

const libro = {
    titulo: "El Quijote",
    autor: "Cervantes",
    año: 1605
}

for (const key in libro) {
    if (!Object.hasOwn(libro, key)) continue;
    
    const element = libro[key];
    console.log(key + ": " + element);   
}

for (const key of Object.keys(libro)) {
    console.log(key)
}

for (const valor of Object.values(libro)){
    console.log(valor)
}


let i = 5;
while (i>=1){
    console.log(i)
    i--
}

i = 1
do {
    if (i%2 == 0) console.log(i)
    i++
} while (i<11);

const precios = [10,20,30,40]

precios.forEach(element => {
    console.log(`Precio: ${element}€`)
});

for (let i = 0; i <= 15; i++) {
    if (i %2 !== 0) console.log(i)
}

const numeros = [5,10,15,20]
let sumaNumeros = 0
for (const numero of numeros) {
    sumaNumeros += numero
}
console.log(sumaNumeros)

const coche = {
    marca: "Toyota",
    modelo: "Corolla",
    año: 2020,
    color: "blanco"
}
i = 0
for (const key in coche) {
    if (Object.hasOwn(coche, key)) i++;
    
}
console.log(i)
//console.log(Object.keys(coche).length)

const alumno = {
    alumno: "Juan",
    edad: 20,
    curso: "2DAM"
}

Object.entries(alumno).forEach(([clave, valor]) => {
    console.log(`${clave}:${valor}`)
})

for (const clave in alumno) {
    if (!Object.hasOwn(alumno, clave)) continue;
    

    const element = alumno[clave];
    console.log(`${clave}:${element}`)
    
}

i= 0
while (i<20){
    if(i%3==0) console.log(i)
    i++
}

const temperaturas = [20,25,30,35]
const fahrenheit = temperaturas.map(temp => temp*1.8 + 32)
console.log(fahrenheit)

const edades = [12,18,25,16,30,14]
const mayores = edades.filter(edad => edad>18)
console.log(mayores)

const palabras = ["hola","mundo","javascript"]
for (const palabra of palabras) {
    console.log(`${palabra} tiene ${palabra.length} letras`)
}

let sumaAcumulada = 0
i = 0
do {
    sumaAcumulada += i
    i++
    
} while (i<=5);
console.log(sumaAcumulada)

//6
//6.1
document.getElementById("titulo-principal").style.backgroundColor = "yellow";

//6.2
document.querySelector(".producto").style.backgroundColor = "lightblue";

//6.3
document.querySelectorAll(".producto").forEach(element => {element.style.backgroundColor = "lightgreen"});

//6.4
document.querySelectorAll("p").forEach(element => {element.style.backgroundColor = "pink"});

//6.5
document.querySelectorAll(".oferta").forEach(element => {element.style.backgroundColor = "orange"});

//6.6
document.querySelector("#ofertas").style.backgroundColor = "lightgray";

//6.7
document.querySelectorAll("h2").forEach(element => {element.style.backgroundColor = "violet"});

//6.8
document.querySelectorAll("span").forEach(element => {element.style.backgroundColor ="cyan"});

//6.9
document.querySelectorAll("div").forEach(element => {element.style.backgroundColor = "beige"});

//6.10
document.querySelector("footer").style.backgroundColor = "lavender";

//6.11

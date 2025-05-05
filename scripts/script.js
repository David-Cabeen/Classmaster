
let comida1 = 3100;
let comida2 = 2500;
let bebida1 = 850;
let bebida2 = 1100;

let totalComida = comida1 + comida2;
let totalBebida = bebida1 + bebida2;
let totalCena = totalComida + totalBebida;


console.log("Total de comida: $" + totalComida);
console.log("Total de bebida: $" + totalBebida);
console.log("Total de la cena: $" + totalCena);

alert("Total de comida: $" + totalComida + "\nTotal de bebida: $" + totalBebida + "\nTotal de la cena: $" + totalCena);



let num1 = parseInt( prompt("Digita un numero") );
let num2 = parseInt (prompt("Digite otro numero"));
let totalresta= num1 - num2

if(totalresta>0){
    alert("Es mayor a 0");

    if (totalresta %2 == 0)
        alert("es un numero par " + totalresta );

    else ((totalresta %2 == 0))
    alert("numero es impar " + totalresta );

};
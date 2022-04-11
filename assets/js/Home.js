import { carapuce } from "./Pokemolle.js";
import { bulbizar } from "./Pokemolle.js";
import { salameche } from "./Pokemolle.js";


import main from "./main.js";
import { homePage } from "./Screen.js";

export default function choosePoke() {

    let map = document.querySelector('.screen');


    map.innerHTML = homePage;

    let characters = document.querySelectorAll('.choosePoke .character');


    // DETECT POKEMOLLE AND PUT OBJECT IN ARRAY
    characters.forEach(element => {
        element.addEventListener('click', () => {
            const pokePicked = element.getAttribute('data-pokemolle');
            if (pokePicked === "Carapuce") {
                main(carapuce);
            } else if (pokePicked === "Bulbizar") {
                main(bulbizar);
            } else {
                main(salameche);
            }
        })
    });
}
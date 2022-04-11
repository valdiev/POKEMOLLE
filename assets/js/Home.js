import { carapuce } from "./Pokemolle.js";
import { bulbizar } from "./Pokemolle.js";
import { salameche } from "./Pokemolle.js";

import main from "./main.js";

export default function choosePoke() {

    let map = document.querySelector('.screen');


    map.innerHTML = `
        <section class="choosePoke">
            <div class="character" data-pokemolle="${carapuce.nom}">
                <div class="character__image"><img src="../assets/img/Pokemolle/${carapuce.image}" alt=""></div>
                <h2>${carapuce.nom}</h2>
            </div>
            <div class="character" data-pokemolle="${bulbizar.nom}">
                <div class="character__image"><img src="../assets/img/Pokemolle/${bulbizar.image}" alt="""></div>
                <h2>${bulbizar.nom}</h2>
            </div>
            <div class="character" data-pokemolle="${salameche.nom}">
            <div class="character__image"><img src="../assets/img/Pokemolle/${salameche.image}" alt=""></div>
                <h2>${salameche.nom}</h2>
            </div>
        </section>
    `

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
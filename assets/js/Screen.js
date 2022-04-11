import { carapuce } from "./Pokemolle.js";
import { bulbizar } from "./Pokemolle.js";
import { salameche } from "./Pokemolle.js";

export let homePage = `
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
</section>`;
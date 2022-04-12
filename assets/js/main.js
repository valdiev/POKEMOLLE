import { ennemolles } from "./Ennemolle.js";
import choosePoke from "./Home.js";
import winExp from "./PokeStats/WinExp.js";
import ennAttack from "./PokeStats/EnnAttack.js";

let map = document.querySelector('.screen');
let round = 0;

choosePoke();

export default function main(pokemolleChosen) {
    let pokemolle = pokemolleChosen;
    console.log(ennemolles);
    let ennemolle = ennemolles[0];

    round++;

    map.innerHTML = `
        <section class="battle">
            <div class="arena">
                <div class="ennemolle">
                    <div class="ennemolle__photo">
                        <img src="../assets/img/Pokemolle/${ennemolle.image}" alt="">
                    </div>
                    <div class="pokemolle__info">
                        <div class="pokemolle__info-name">
                            <h2>${ennemolle.nom}</h2>
                            <p>N.${ennemolle.level}</p>
                        </div>
                        <div class="pokemolle__info-life">
                            <progress value="${ennemolle.vie}" max="${ennemolle.maxVie}"></progress>
                        </div>
                    </div>
                </div>
                <div class="pokemolle">
                    <div class="pokemolle__photo">
                        <img src="../assets/img/Pokemolle/${pokemolle.image}" alt="">
                    </div>
                    <div class="pokemolle__info">
                        <div class="pokemolle__info-name">
                            <h2>${pokemolle.nom}</h2>
                            <p>N.${pokemolle.level}</p>
                        </div>
                        <div class="pokemolle__info-life">
                            <progress value="${pokemolle.vie}" max="${pokemolle.maxVie}"></progress>
                            <p><span class="life">${pokemolle.vie}</span> / ${pokemolle.maxVie}</p>
                        </div>
                        <!--<progress class="exp" value="${pokemolle.exp}" max="${pokemolle.expToLvlUp}"></progress>-->
                        <div class="exp">
                            <span data-exp="${pokemolle.exp}" data-expmax="${pokemolle.expToLvlUp}" style="width: ${pokemolle.exp / pokemolle.expToLvlUp * 100}%""></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="menu">
            <div class="menu__message">
                <p>Que doit faire <span>${pokemolle.nom}</span> ?</p>
            </div>
            <div class="menu__actions">
                <button class="btn btn__attack">Attaque</button>
                <button class="btn btn__soin ${pokemolle.vie == pokemolle.maxVie ? "disable" : ""}">Soin</button>
            </div>
        </div>
        </section>
    `;

    let attack = document.querySelector("button.btn__attack");
    let soin = document.querySelector("button.btn__soin");

    let pokeLifeBar = document.querySelector(".pokemolle .pokemolle__info-life progress");
    let pokeLifePoint = document.querySelector(".pokemolle .pokemolle__info-life p span.life");

    let ennLifeBar = document.querySelector(".ennemolle .pokemolle__info-life progress");


    attack.addEventListener('click', () => {
        pokeAttack(ennemolle, pokemolle);
        setTimeout(() => {
            if(ennemolles.length !== 0 && ennemolle.vie > 0) {
                console.log(ennemolle.vie);
                ennAttack(pokemolle, ennemolle)
            }
        }, 600);
    });

    soin.addEventListener('click', () => {
        molleSoin(pokemolle);
    })

    function pokeAttack(enn, poke) {

        window.alert(`${poke.nom} attaque !!`);

        if(poke.type == "Eau" && enn.type == "Feu" || poke.type == "Plante" && enn.type == "Eau" || poke.type == "Eau" && enn.type == "Roche") {
            poke.attaque = Math.round(poke.attaque * 2);
            window.alert(`Très efficace sur ${enn.nom} ennemi !`);
        } else if(poke.type == "Normal" || enn.type == "Normal" || poke.type == enn.type) {
            poke.attaque;
        } else if(poke.type == "Electrique" && enn.type == "Roche") {
            poke.attaque = 0;
            window.alert(`Cela n'affecte pas ${enn.nom} ennemi...`)
        }
        else {
            poke.attaque = Math.round(poke.attaque / 2);
            window.alert(`Ce n'est pas efficace sur ${enn.nom} ennemi !`);
        }

        enn.vie = enn.vie - poke.attaque;
        ennLifeBar.value = enn.vie;

        if (ennLifeBar.value == 0) {
            document.querySelector(".ennemolle__photo").classList.add("ko");
            ennemolles.splice(0, 1);

            winExp(poke, enn);

            if (ennemolles.length !== 0) {
                setTimeout(() => {
                    main(pokemolleChosen);
                }, 400);
            } else {
                map.innerHTML = `
                <section class="gameOver">
                    <div class="gameOver__image">
                        <img src="../assets/img/logo.png" alt="">
                    </div>
                    <h1>Tu as gagné !!</h1>
                    <h2>Tu as passé les ${round} manches</h2>
                    <button onClick="window.location.reload();">Je veux réessayer !</button>
                </section>
            `;
            };
        }
    }

    function molleSoin(molle) {
        
        if(molle.vie == molle.maxVie) {
            window.alert("Votre vie est à son déjà à son maximum !");
        } else if(molle.vie <= molle.maxVie) {
            molle.vie += molle.soin; 

            if(molle.maxVie < molle.vie) {
                molle.vie = molle.maxVie;
            }
            setTimeout(() => {
                if(ennemolles.length !== 0) {
                    ennAttack(pokemolle, ennemolle);
                }
            }, 600);
        }

        pokeLifeBar.value = molle.vie;
        pokeLifePoint.innerHTML = molle.vie;

    }
}
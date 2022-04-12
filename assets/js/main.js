import { ennemolles } from "./Ennemolle.js";
import choosePoke from "./Home.js";
import winExp from "./PokeStats/WinExp.js";
import ennAttack from "./PokeStats/EnnAttack.js";

let map = document.querySelector('.screen');
let round = 0;

choosePoke();

export default function main(pokemolleChosen) {
    let pokemolle = pokemolleChosen;
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
                <button class="btn btn__soin">Soin</button>
            </div>
            <div class="menu__attacks">
                <button class="btn btn__base">${pokemolle.attaque}</button>
                <button class="btn btn__elem btn__${pokemolle.type}">${pokemolle.elementaire}</button>
                <button class="btn btn__back">retour</button>
            </div>
        </div>
        </section>
    `;

    // MENU ACTIONS
    let menuBtn = document.querySelector('.menu__actions');
    let menuAttack = document.querySelector('.menu__attacks');
    let attackBtn = document.querySelector("button.btn__attack");
    let backBtn = document.querySelector("button.btn__back");
    let attackElem = document.querySelector("button.btn__elem");
    let attackBase = document.querySelector("button.btn__base");
    let soin = document.querySelector("button.btn__soin");

    // POKEMOLLE STATS
    let pokeLifeBar = document.querySelector(".pokemolle .pokemolle__info-life progress");
    let pokeLifePoint = document.querySelector(".pokemolle .pokemolle__info-life p span.life");
    let ennLifeBar = document.querySelector(".ennemolle .pokemolle__info-life progress");

    // POKEMOLLE PHOTOS
    let pokemollePhoto = document.querySelector(".pokemolle .pokemolle__photo");
    
    menuAttack.style.display = "none";
    
    
    attackBtn.addEventListener('click', () => {
        menuBtn.style.display = "none";
        menuAttack.style.display = "flex";


        attackBase.addEventListener('click', () => {
            let sound = new Audio(`../assets/sound/charge.mp3`);
            pokemollePhoto.classList.add("pokemolle__attack");
            sound.play();

            setTimeout(() => {
                pokemollePhoto.classList.remove("pokemolle__attack");
                pokeAttack(ennemolle, pokemolle);
                setTimeout(() => {
                    if(ennemolles.length !== 0 && ennemolle.vie > 0) {
                        ennAttack(pokemolle, ennemolle)
                    }
                }, 600);
            }, 800)
        })
        
        attackElem.addEventListener('click', () => {
            let sound = new Audio(`../assets/sound/${pokemolle.sound}.mp3`);
            pokemollePhoto.classList.add("pokemolle__attack");
            sound.play();

            setTimeout(() => {
                pokeAttackElem(ennemolle, pokemolle);
                setTimeout(() => {
                    if(ennemolles.length !== 0 && ennemolle.vie > 0) {
                        ennAttack(pokemolle, ennemolle)
                    }
                }, 600);
            }, 600);
        });

        backBtn.addEventListener('click', () => {
            menuAttack.style.display = "none";
            menuBtn.style.display = "grid";
        });
    });
    

    soin.addEventListener('click', () => {
        molleSoin(pokemolle);
    })

    function pokeAttack(enn, poke) {
        window.alert(`${poke.nom} utilise ${poke.attaque} !!`);

        enn.vie = enn.vie - poke.elementaireDegats;
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

    function pokeAttackElem(enn, poke) {
        window.alert(`${poke.nom} utilise ${poke.elementaire} !!`);


        if(poke.type == "Eau" && enn.type == "Feu" || poke.type == "Feu" && enn.type == "Plante" || poke.type == "Plante" && enn.type == "Eau" || poke.type == "Eau" && enn.type == "Roche") {
            poke.attaqueDegats = poke.cc;
            window.alert(`Très efficace sur ${enn.nom} ennemi !`);
        } else if(poke.type == "Normal" || enn.type == "Normal" || poke.type == enn.type) {
            poke.attaqueDegats;
        } else if(poke.type == "Electrique" && enn.type == "Roche") {
            poke.attaqueDegats = 0;
            window.alert(`Cela n'affecte pas ${enn.nom} ennemi...`)
        }
        else {
            poke.attaqueDegats = poke.ec;
            window.alert(`Ce n'est pas efficace sur ${enn.nom} ennemi !`);
        }

        enn.vie = enn.vie - poke.attaqueDegats;
        ennLifeBar.value = enn.vie;

        if (ennLifeBar.value == 0) {
            document.querySelector(".ennemolle__photo").classList.add("ko");
            ennemolles.splice(0, 1);
            poke.attaqueDegats = poke.attaqueDegatsIni;

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
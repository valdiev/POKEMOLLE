import { ennemolles } from "./Ennemolle.js";
import choosePoke from "./Home.js";

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
                <button class="btn btn__soin">Soin</button>
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
            ennAttack(pokemolle, ennemolle)
        }, 600);
    });

    soin.addEventListener('click', () => {
        molleSoin(pokemolle);
    })

    function pokeAttack(enn, poke) {
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

    function ennAttack(poke, enn) {
        poke.vie = poke.vie - enn.attaque;
        pokeLifeBar.value = poke.vie;
        pokeLifePoint.innerHTML = poke.vie;

        if (pokeLifeBar.value === 0) {
            map.innerHTML = `
                <section class="gameOver">
                    <div class="gameOver__image">
                        <img src="../assets/img/logo.png" alt="">
                    </div>
                    <h1>Tu as perdu...</h1>
                    <h2>Tu es arrivé(e) à la manche n°${round} </h2>
                    <h2>Tu as perdu contre ${ennemolle.nom} niveau ${ennemolle.level}</h2>
                    <button onClick="window.location.reload();">Je veux ma revanche !</button>
                </section>
            `;
        }
    }

    function molleSoin(molle) {
        soin.disabled = false;
        molle.vie += molle.soin;

        // if(molle.vie == molle.maxVie) {
        //     soin.disabled = true;
        // } else {
        //     soin.disabled = false;
        //     if(molle.vie > molle.maxVie) {
        //         molle.vie == molle.maxVie
        //         soin.disabled = true;
        //     }
        // }
        pokeLifeBar.value = molle.vie;
        pokeLifePoint.innerHTML = molle.vie;

        setTimeout(() => {
            ennAttack(pokemolle, ennemolle)
        }, 600);
    }

    function winExp(poke, enn) {
        poke.exp += enn.exp;
        poke.setExp = poke.exp;

        if(poke.exp > poke.expToLvlUp) {
            let expSupp = poke.exp - poke.expToLvlUp;
            poke.exp = 0;
            poke.lvlUp = poke.exp + expSupp;
            console.log(poke.exp);

            if(poke.exp > poke.expToLvlUp) {
                winExp(poke, enn);
            } else return;
        }
    }
}
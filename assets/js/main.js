import { ennemolles } from "./Ennemolle.js";
import choosePoke from "./Home.js";
import winExp from "./PokeStats/WinExp.js";
import ennAttack from "./PokeStats/EnnAttack.js";
import pokeAttack from "./PokeStats/PokeAttack.js";
import pokeAttackElem from "./PokeStats/PokeAttackElem.js";
import newEnn from "./PokeStats/newEnn.js";

let map = document.querySelector('.screen');
let round = 0;
let battleSound = new Audio('../assets/sound/battle.mp3');

choosePoke();

export default function main(pokemolleChosen) {
    battleSound.volume = 0.05;
    battleSound.play();
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
                <button class="btn btn__soin">Soin <span class="nbPotion" style="text-transform: initial">x${pokemolle.nbPotion}</span></button>
            </div>
            <div class="menu__attacks">
                <button class="btn btn__base">${pokemolle.attaque} <span class="nbAttack">${pokemolle.nbAttaque}</span>/${pokemolle.nbAttaqueMax}</button>
                <button class="btn btn__elem btn__${pokemolle.type}">${pokemolle.elementaire} <span class="nbAttack">${pokemolle.nbAttaqueSpe}</span>/${pokemolle.nbAttaqueSpeMax}</button>
            
                <button class="btn btn__def" style="${pokemolle.level > 6 ? "display: block" : "display: none"}">${pokemolle.attaqueDef} <span class="nbAttack">${pokemolle.nbAttaqueDef}</span>/${pokemolle.nbAttaqueDefMax}</button>
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
    let attackDef = document.querySelector("button.btn__def");
    let soin = document.querySelector("button.btn__soin");
    let nbAttack = document.querySelector("button.btn__base span");
    let nbAttackSpe = document.querySelector("button.btn__elem span");
    let nbPotion = document.querySelector("button.btn__soin span");


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
            pokemollePhoto.classList.remove("pokemolle__attack");
            pokeAttack(ennemolle, pokemolle, ennLifeBar, ennemolles, winExp, main, pokemolleChosen, map, round, pokemollePhoto, nbAttack, newEnn);
            if(ennemolle.vie > 0){
                setTimeout(() => {
                    if(ennemolles.length !== 0 && ennemolle.vie > 0) {
                        ennAttack(pokemolle, ennemolle, round);
                    }
                }, 600);
            }
            else{
                newEnn(ennemolle, ennemolles);
            }
        })
    
        
        attackElem.addEventListener('click', () => {

            setTimeout(() => {
                pokeAttackElem(ennemolle, pokemolle, pokemollePhoto, ennLifeBar, ennemolles, map, winExp, main, pokemolleChosen, round, nbAttackSpe, newEnn);
                if(ennemolle.vie > 0){
                    setTimeout(() => {
                        if(ennemolles.length !== 0 && ennemolle.vie > 0) {
                            ennAttack(pokemolle, ennemolle, round);
                        }
                    }, 600);
                }
                else{
                    newEnn(ennemolle, ennemolles);
                }
                
            }, 600);
        });
        
        attackDef.addEventListener('click', () => {
            pokemolle.attaqueDefDuree = 3;
            pokemolle.nbAttaqueDef--;
            if(pokemolle.nbAttaqueDef === 0) {
                attackDef.disabled = true;
                attackDef.classList.add("disabled");
            }
            attackDef.childNodes[1].innerHTML = pokemolle.nbAttaqueDef;
            window.alert(`${pokemolle.nom} utilise ${pokemolle.attaqueDef}`);
            window.alert(`${pokemolle.nom} se protège pendant 3 tours !`);
            setTimeout(() => {
                if(ennemolles.length !== 0 && ennemolle.vie > 0) {
                    ennAttack(pokemolle, ennemolle, round);
                }
            }, 600);
        })

        backBtn.addEventListener('click', () => {
            menuAttack.style.display = "none";
            menuBtn.style.display = "grid";
        });
    });
    

    soin.addEventListener('click', () => {
        molleSoin(pokemolle);
    })

    function molleSoin(pokemolle) {
        if(pokemolle.nbPotion > 0){
            if(pokemolle.vie == pokemolle.maxVie) {
                window.alert("Votre vie est à son déjà à son maximum !");
            } else if(pokemolle.vie <= pokemolle.maxVie) {
                pokemolle.nbPotion--;
                nbPotion.innerHTML = "x" + pokemolle.nbPotion;
                let sound = new Audio("../assets/sound/heal.mp3");
                sound.play();
                pokemolle.vie += pokemolle.soin; 

                if(pokemolle.maxVie < pokemolle.vie) {
                    pokemolle.vie = pokemolle.maxVie;
                }
                setTimeout(() => {
                    if(ennemolles.length !== 0) {
                        ennAttack(pokemolle, ennemolle, round);
                    }
                }, 600);
            }

            pokeLifeBar.value = pokemolle.vie;
            pokeLifePoint.innerHTML = pokemolle.vie;
        }
        else{
        
            window.alert(`Plus de potion de vie !`);
        }
    }
}
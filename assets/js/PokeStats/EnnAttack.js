export default function ennAttack(poke, enn) {
    let map = document.querySelector('.screen');
    let pokeLifeBar = document.querySelector(".pokemolle .pokemolle__info-life progress");
    let pokeLifePoint = document.querySelector(".pokemolle .pokemolle__info-life p span.life");

    window.alert(`${enn.nom} ennemi attaque !!`);

    if(enn.type == "Eau" && poke.type == "Feu" || enn.type == "Feu" && poke.type == "Plante" || enn.type == "Plante" && poke.type == "Eau" || enn.type == "Eau" && poke.type == "Roche") {
        enn.attaque = Math.round(enn.attaque * 2);
        window.alert(`Très efficace sur ${poke.nom} allié !`);
    } else if(enn.type == "Normal" || poke.type=="Normal" || enn.type == poke.type) {
        enn.attaque;
    } else if(enn.type == "Electrique" && poke.type == "Roche") {
        enn.attaque = 0;
        window.alert(`Cela n'affecte pas ${poke.nom} allié...`)
    }
    else {
        enn.attaque = Math.round(enn.attaque / 2);
        window.alert(`Ce n'est pas efficace sur ${poke.nom} allié !`);
    }

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
                <h2>Tu as perdu contre ${enn.nom} niveau ${enn.level}</h2>
                <button onClick="window.location.reload();">Je veux ma revanche !</button>
            </section>
        `;
    }
}
export default function ennAttack(poke, enn) {
    let pokeLifeBar = document.querySelector(".pokemolle .pokemolle__info-life progress");
    let pokeLifePoint = document.querySelector(".pokemolle .pokemolle__info-life p span.life");

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
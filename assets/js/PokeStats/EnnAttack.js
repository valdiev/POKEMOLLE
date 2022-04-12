export default function ennAttack(poke, enn) {
    let map = document.querySelector('.screen');
    let pokeLifeBar = document.querySelector(".pokemolle .pokemolle__info-life progress");
    let pokeLifePoint = document.querySelector(".pokemolle .pokemolle__info-life p span.life");

    let ennemollePhoto = document.querySelector(".ennemolle .ennemolle__photo");

    window.alert(`${enn.nom} ennemi attaque !!`);

    if(enn.type == "Eau" && poke.type == "Feu" || enn.type == "Feu" && poke.type == "Plante" || enn.type == "Plante" && poke.type == "Eau" || enn.type == "Eau" && poke.type == "Roche") {
        enn.attaqueDegats = enn.cc;
        window.alert(`Très efficace sur ${poke.nom} allié !`);
    } else if(enn.type == "Normal" || poke.type=="Normal" || enn.type == poke.type) {
        enn.attaqueDegats;
    } else if(enn.type == "Electrique" && poke.type == "Roche") {
        enn.attaqueDegats = 0;
        window.alert(`Cela n'affecte pas ${poke.nom} allié...`)
    }
    else {
        enn.attaqueDegats = enn.ec;
        window.alert(`Ce n'est pas efficace sur ${poke.nom} allié !`);
    }

    let sound = new Audio(`../assets/sound/charge.mp3`);
    ennemollePhoto.classList.add("pokemolle__attack");
    sound.play();

    setTimeout(() => {
        ennemollePhoto.classList.remove("pokemolle__attack");
        poke.vie = poke.vie - enn.attaqueDegats;
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
    }, 800)

}
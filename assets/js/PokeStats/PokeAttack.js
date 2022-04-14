export default function pokeAttack(enn, poke, ennLifeBar, ennemolles, winExp, main, pokemolleChosen, map, round) {
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
            let winSound = new Audio('../assets/sound/win.mp3');
            winSound.play();
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
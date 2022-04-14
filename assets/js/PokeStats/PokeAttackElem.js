export default function pokeAttackElem(enn, poke, pokemollePhoto, ennLifeBar, ennemolles, map, winExp, main, pokemolleChosen, round, nbAttackSpe, newEnn) {
    if(poke.nbAttaqueSpe > 0){
        if(poke.nbAttaqueSpe === 1){
            nbAttackSpe.parentNode.disabled = true;
            nbAttackSpe.parentNode.classList.add("disabled");
        }
        window.alert(`${poke.nom} utilise ${poke.elementaire} !!`);
        poke.nbAttaqueSpe--;
        nbAttackSpe.innerHTML = poke.nbAttaqueSpe;
        let echecCrit = Math.random();
        if(echecCrit > 0.1){
            let sound = new Audio(`../assets/sound/${poke.sound}.mp3`);
            pokemollePhoto.classList.add("pokemolle__attack");
            sound.play();
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
                poke.attaqueDegats = poke.attaqueDegatsIni;
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
        else{
            window.alert(` ${poke.nom} a raté son attaque`);
        }
    }

}
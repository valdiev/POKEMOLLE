export default function pokeAttack(ennemolle, pokemolle, ennLifeBar, ennemolles, winExp, main, pokemolleChosen, map, round, pokemollePhoto, nbAttack,newEnn) {
    if(pokemolle.nbAttaque > 0){
        window.alert(`${pokemolle.nom} utilise ${pokemolle.attaque} !!`);
        if(pokemolle.nbAttack === 1){
            nbAttack.parentNode.disabled = true;
            nbAttack.parentNode.classList.add("disabled");
        } 
        let echecCrit = Math.random();
        pokemolle.nbAttaque--;
        nbAttack.innerHTML = pokemolle.nbAttaque;
        if(echecCrit > 0.1){
            let sound = new Audio(`../assets/sound/charge.mp3`);
            pokemollePhoto.classList.add("pokemolle__attack");
            sound.play();
            ennemolle.vie = ennemolle.vie - pokemolle.elementaireDegats;
            ennLifeBar.value = ennemolle.vie;

            if (ennLifeBar.value == 0) {
                document.querySelector(".ennemolle__photo").classList.add("ko");
                winExp(pokemolle, ennemolle);
            
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
            window.alert(` ${pokemolle.nom} a raté son attaque`);
        }
    }
}
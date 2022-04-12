export default function winExp(poke, enn) {
    poke.exp += enn.exp;
    poke.setExp = poke.exp;

    if(poke.exp > poke.expToLvlUp) {
        let expSupp = poke.exp - poke.expToLvlUp;
        poke.exp = 0;
        poke.lvlUp = poke.exp + expSupp;

        if(poke.exp > poke.expToLvlUp) {
            winExp(poke, enn);
        } else return;
    }
}
class Pokemolle {
    constructor(image, nom,type,attaque,vie, maxVie, level, exp, expToLvlUp, soin) {
        this.image = image;
        this.nom = nom;
        this.type = type;
        this.attaque = attaque;
        this.vie = vie;
        this.maxVie = maxVie;
        this.level = level;
        this.exp = exp;
        this.expToLvlUp = expToLvlUp;
        this.soin = soin;
    }

    set setExp(value) {
        this.exp = value;
    }

    set lvlUp(value) {
        this.level += 1;
        this.attaque += Math.round(this.level * 0.5);
        this.maxVie += Math.round(this.level * 0.5);
        this.exp = value;
        this.expToLvlUp = this.expToLvlUp * 2;
        this.vie += Math.round(this.level * 0.5);
    }
}

export let carapuce = new Pokemolle("carapuce.gif", "Carapuce", "Eau", 5, 20, 20, 6, 0, 20, 5);
export let bulbizar = new Pokemolle("bulbizar.webp", "Bulbizar", "Plante", 5, 20, 20, 6, 0, 20, 5);
export let salameche = new Pokemolle("salameche.webp", "Salameche", "Feu", 5, 20, 20, 6, 0, 20, 5);


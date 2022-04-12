class Pokemolle {
    constructor(home, image, nom,type,attaque,vie, maxVie, level, exp, expToLvlUp, soin) {
        this.home = home;
        this.image = image;
        this.nom = nom;
        this.type = type;
        this.attaqueIni = attaque;
        this.attaque = attaque;
        this.cc = Math.round(attaque * 2),
        this.ec = Math.round(attaque / 2),
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
        this.attaqueIni += 1;
        this.attaque += 1;
        this.cc = Math.round(this.attaque * 2),
        this.ec = Math.round(this.attaque / 2),
        this.maxVie += Math.round(this.level * 0.5);
        this.exp = value;
        this.expToLvlUp = this.expToLvlUp * 2;
        this.vie += Math.round(this.level * 0.5);
    }
}

export let carapuce = new Pokemolle("carapuce-front.webp", "carapuce.gif", "Carapuce", "Eau", 5, 20, 20, 6, 0, 20, 10);
export let bulbizar = new Pokemolle("bulbizar-front.webp", "bulbizar.webp", "Bulbizar", "Plante", 5, 20, 20, 6, 0, 20, 10);
export let salameche = new Pokemolle("salameche-front.webp", "salameche.webp", "Salameche", "Feu", 5, 20, 20, 6, 0, 20, 10);


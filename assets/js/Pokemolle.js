class Pokemolle {
    constructor(home, image, nom,type, attaqueName, attaque, elementaire, vie, maxVie, level, exp, expToLvlUp, soin, sound) {
        this.home = home;
        this.image = image;
        this.nom = nom;
        this.type = type;
        this.attaque = attaqueName;
        this.attaqueDegatsIni = attaque;
        this.attaqueDegats = attaque;
        this.elementaire = elementaire;
        this.elementaireDegats = 6;
        this.cc = Math.round(attaque * 2),
        this.ec = Math.round(attaque / 2),
        this.vie = vie;
        this.maxVie = maxVie;
        this.level = level;
        this.exp = exp;
        this.expToLvlUp = expToLvlUp;
        this.soin = soin;
        this.sound = sound;
    }

    set setExp(value) {
        this.exp = value;
    }

    set lvlUp(value) {
        this.level += 1;
        this.attaqueDegatsIni += 1;
        this.attaqueDegats += 1;
        this.elementaireDegats += 2;
        this.cc = Math.round(this.attaqueDegats * 2),
        this.ec = Math.round(this.attaqueDegats / 2),
        this.maxVie += Math.round(this.level * 0.5);
        this.exp = value;
        this.expToLvlUp = this.expToLvlUp * 2;
        this.vie += Math.round(this.level * 0.5);
    }
}

export let carapuce = new Pokemolle("carapuce-front.webp", "carapuce.gif", "Carapuce", "Eau", "Charge", 5, "Pistolet à O", 20, 20, 6, 0, 20, 10, "pistoletao");
export let bulbizar = new Pokemolle("bulbizar-front.webp", "bulbizar.webp", "Bulbizarre", "Plante", "Charge", 5, "Fouet Lianes", 20, 20, 6, 0, 20, 10, "fouetliane");
export let salameche = new Pokemolle("salameche-front.webp", "salameche.webp", "Salameche", "Feu", "Griffe", 5, "Flammèche", 20, 20, 6, 0, 20, 10, "flammeche");


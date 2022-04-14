class Ennemolle {
    constructor(image, nom,type,attaque, vie, maxVie, level, exp) {
        this.image = image,
        this.nom = nom,
        this.type = type,
        this.attaqueDegats = attaque,
        this.cc = Math.round(attaque * 2),
        this.ec = Math.round(attaque / 2),
        this.vie = vie,
        this.maxVie = maxVie,
        this.level = level,
        this.exp = exp
    }

    set lvlUp(value) {
        this.level += 8;
        this.attaqueDegats += 3;
        this.cc = Math.round(this.attaqueDegats * 2),
        this.ec = Math.round(this.attaqueDegats / 2),
        this.maxVie += 10;
        this.exp = value * 2;
        this.vie += 10;
    }
}

let salameche = new Ennemolle("salameche-front.webp", "Salameche", "Feu", 4, 10, 10, 5, 40);
let bulbizar = new Ennemolle("bulbizar-front.webp", "Bulbizarre", "Plante", 6, 15, 15, 8, 30);
let carapuce = new Ennemolle("carapuce-front.webp", "Carapuce", "Eau", 6, 30, 30, 14, 50);

export let ennemolles = [salameche, bulbizar, carapuce];

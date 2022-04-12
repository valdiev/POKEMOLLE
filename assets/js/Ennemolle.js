class Ennemolle {
    constructor(image, nom,type,attaque, vie, maxVie, level, exp) {
        this.image = image,
        this.nom = nom,
        this.type = type,
        this.attaque = attaque,
        this.cc = Math.round(attaque * 2),
        this.ec = Math.round(attaque / 2),
        this.vie = vie,
        this.maxVie = maxVie,
        this.level = level,
        this.exp = exp
    }
}

let salameche = new Ennemolle("salameche-front.webp", "Salameche", "Feu", 4, 10, 10, 5, 40);
let bulbizar = new Ennemolle("bulbizar-front.webp", "Bulbizar", "Plante", 6, 15, 15, 8, 30);
let carapuce = new Ennemolle("carapuce-front.webp", "Carapuce", "Eau", 6, 30, 30, 14, 50);

export let ennemolles = [salameche, bulbizar, carapuce];

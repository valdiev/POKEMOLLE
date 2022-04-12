class Ennemolle {
    constructor(image, nom,type,attaque,vie, maxVie, level, exp) {
        this.image = image,
        this.nom = nom,
        this.type = type,
        this.attaque = attaque,
        this.vie = vie,
        this.maxVie = maxVie,
        this.level = level,
        this.exp = exp
    }
}

let rattata = new Ennemolle("rattata.gif", "Rattata", "Feu", 4, 10, 10, 5, 10);
let rondoudou = new Ennemolle("rondoudou.gif", "Rondoudou", "Normal", 6, 15, 15, 8, 15);
let racaillou = new Ennemolle("racaillou.gif", "Racaillou", "Roche", 10, 30, 30, 14, 50);
let voltobre = new Ennemolle("voltobre.gif", "Voltobre", "Ténèbre", 15, 40, 40, 20, 200);

export let ennemolles = [rattata, rondoudou, racaillou, voltobre];

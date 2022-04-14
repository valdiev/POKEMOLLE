export default function newEnn(enn, ennemolles){
    let newEnn = enn;
    newEnn.vie = newEnn.maxVie;
    newEnn.lvlUp = enn.exp
    ennemolles.push(newEnn);
    ennemolles.splice(0,1);
}
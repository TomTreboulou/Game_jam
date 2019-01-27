var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'test',
    physics: {
        default: 'arcade',
    },
    scene: [
    {
        preload: preload,
        create: create,
        update: update
    }
    ]
};

location.href = "link.html";

var text = [
    "Once upon a time... Mince excusez-moi je n’ai plus toute ma tête.", 
    "Pourtant tout allait bien jusqu’à ce jour, ce moment... ",
    "Vous vous demandez ce qu’il s'est passé ?",
    "Je ne vous le dirai pas... Pardon ?",
    "Oui oui bien sur je vous le raconte.",
    "Je ne me souviens pas exactement des circonstances mais c’était un soir de pluie.",
    "J’étais dans ma voiture à écouter la radio.",
    "Je fus surpris d’y prêter attention, moi-même ne sachant pas pourquoi elle attira mon oreille.",
    "Ce soir-là, une jeune femme parlait de ses disputes incessantes avec son mari alors qu’elle était enceinte...",
    "Enfin rien de spécial même si je pensais à ma femme, Aurore, enceinte-t-elle aussi.",
    "J’écoutais donc cette émission jusqu’à ce que le présentateur redemandât l’identité de l’auditrice...",
    "Elle s’appelait Aurore...",
    "Dans un élan d’angoisse j’attrapa mon téléphone pour appeler ma femme.",
    "A ce même moment une ombre surgit de la route m’obligeant à l’esquiver..."]

console.log("fichier cinematique");
var game = new Phaser.Game(config);

function preload() {

}

function create() {
    loreText = this.add.text(config.height - 100, config.width / 2, "", {font: "30px Arial", fill: "#fff"}).setOrigin(0.5).setScrollFactor(0);
}

var i = 0;
setInterval(function() {
    loreText.setText(text[i]);
    i++;
}, 1000);

function update() {

}
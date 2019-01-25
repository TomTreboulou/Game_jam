var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'test', { create: create });

function create() {

    var text = "test";
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

    var t = game.add.text(game.world.centerX-300, 0, text, style);

}
var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#000',
    parent: 'test',
    scene: {
        preload: preload,
        create: create
    }
};

console.log("fichier");

var game = new Phaser.Game(config);

// Charger les assets
function preload ()
{
    console.log("preload");
    this.load.image('imgTest', 'img/imgTest.png');
}

// Creer les elements du jeu
function create ()
{
    console.log("create");

    //  Implicit values
    var config1 = {
        key: 'imgTest',
        x: 400,
        y: 300
    };
    this.make.sprite(config1);
}

// Boucle du jeu (60 fois par sec)
//donc pas besoin de time: un int suffit!
function update()
{
    console.log("update");
}
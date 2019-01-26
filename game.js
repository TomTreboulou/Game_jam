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

console.log("fichier");

var game = new Phaser.Game(config);
//game.state.add('game', GameState, true);

var playe;

var keyZ;
var keyQ;
var keyS;
var keyD;

var test;
var monster;

var soul1;
var soul2;
var soul3;
var soul4;

var pioche;
var arc;
var coup;
var monster;
var ting;
var rire;
var epee;
var switch_foot;

var gemme1 = [];

// Charger les assets
function preload ()
{
    console.log("preload");
    // this.load.image('soul' + 1, 'soul' + 1 + '.png', 37, 45, 18);
    // this.load.image('soul' + 2, 'soul' + 2 + '.png', 37, 45, 18);
    // this.load.image('soul' + 3, 'soul' + 3 + '.png', 37, 45, 18);
    // this.load.image('soul' + 4, 'soul' + 4 + '.png', 37, 45, 18);
    this.load.image('soul' + 1, 'soul' + 1 + '.png', 37, 45, 18);
    // this.load.image('gemme' + 2, 'gemme' + 2 + '.png', 37, 45, 18);
    // this.load.image('gemme' + 3, 'gemme' + 3 + '.png', 37, 45, 18);
    // this.load.image('gemme' + 4, 'gemme' + 4 + '.png', 37, 45, 18);
    this.load.image('bg', 'img/bg.jpg');
    this.load.image('imgTest', 'img/imgTest.png');
    this.load.image('monster2', 'monster2.png');

    this.load.image('haine1', 'img/monstres/haine/haine1.png');

    for(let i = 1; i <= 4; i++) {
        this.load.image('haine' + i, 'img/monstres/haine/haine'+i+'.png');
    }

    for(let i = 1; i <= 3; i++) {
        this.load.image('orb_red' + i, 'img/orbes/red/orb_red'+i+'.png');
    }

    this.load.image('nexus', 'img/NEXUS.png');

    this.load.image('hud', 'img/hud.png');

    this.load.image('ground', 'img/sol.png');

    // MUSIQUES
    this.load.audio('musiqueDeFond', 'son/musiques/fond.ogg');

    // SON
    this.load.audio('arc', 'son/effets/arc.ogg');
    this.load.audio('coup', 'son/effets/bruit_coup.ogg');
    this.load.audio('monster', 'son/effets/monster.ogg');
    this.load.audio('pioche', 'son/effets/coup_pioche.ogg');
    this.load.audio('rire', 'son/effets/rire_monster.ogg');
    this.load.audio('ting', 'son/effets/ting.ogg');
    this.load.audio('epee', 'son/effets/coup_epee.ogg');
    this.load.audio('walk1', 'son/effets/walk1.mp3');
    this.load.audio('walk2', 'son/effets/walk2.mp3');

    // SPREADSHEETS
    //this.load.spritesheet('haine', 'monstres/haine.png', 37, 45, 18);
}

// Creer les elements du jeu
function create ()
{
    console.log("create");

    //bg = this.add.tileSprite(0, 0, 1280, 720, 'bg');
    //bg = this.add.image(0, 0, 'bg').setOrigin(0);
    //bg.setScale(4.5);

    bg = this.add.tileSprite(0, 0, 1280 * 3, 720 * 3, 'ground').setOrigin(0);

    nexus = this.add.image(0, 3 * 720, 'nexus').setScale(0.3);

    var music = this.sound.add('musiqueDeFond');
    music.play();
    pioche = this.sound.add('pioche');
    arc = this.sound.add('arc');
    coup = this.sound.add('coup');
    monster = this.sound.add('monster');
    ting = this.sound.add('ting');
    rire = this.sound.add('rire');
    epee = this.sound.add('epee');
    walk1 = this.sound.add('walk1');
    walk2 = this.sound.add('walk2');

    //Create soul:


    //var gemme1 = new gemme(10, 10, 1, this);
    //var soul2 = new soul(100, 100, 2, 'soul2.png');

    this.cameras.main.setBounds(0, 0, 1280 * 3, 720 * 3);
    this.physics.world.setBounds(0, 0, 1280 * 3, 720 * 3);

    //var tileset = map.addTilesetImage('world', 'bg');
    //var layer = map.createStaticLayer('world', tileset, 0, 0);

    //  Implicit values
    var config1 = {
        key: 'imgTest'
    };
    var config2 = {
        key: 'monster2'
    };

    keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // GEMMES
    for (var i = 0; i < 20; i++) {
        gemme1[i] = new gemme(Math.random() * 2000, Math.random() * 2000, 1, this, playe);
    }
    // PLAYER
    playe = new Player(this.physics.add.image(100, 1400, 'imgTest'),100,1400);
    playe.sprite.setCollideWorldBounds(true);
    playe.sprite.setScale(0.4);

    // Proprietes gemmes
    gemme1.forEach((g) => {
        this.physics.add.overlap(playe.sprite, g.img, collectSoul, null, this);
    });

    // MONSTRES
    monster = [];
    for (let i = 0; i < 50; i++) {
        let k = Math.random() * 10000 + 2160;
        let j = Math.random() * k;
        monster[i] = new shadow(j,2160-Math.sqrt((k*k)-(j * j)),2,this.physics.add.image(0, 0, 'haine1'),0,720*3);
        animateSprite(monster[i].img, 'haine', 4, 500);
    }
    this.physics.add.collider(playe.sprite, monster.img);


    // CAMERA
    this.cameras.main.startFollow(playe.sprite, true, 0.5, 0.5);

    hud = this.add.image(0, 0, 'hud').setOrigin(0).setScrollFactor(0);
    soul1 = new soul(800, 43, 1, this);
}

function collectSoul(player, gemme)
{
    gemme.hp -= 1;
    if (gemme.hp <= 0) {
        gemme.disableBody(true, true);
    }
}

// Boucle du jeu (60 fois par sec)
//donc pas besoin de time: un int suffit! lol
function modify_player_mvt(vitesse) {
    playe.sprite.setVelocity(0);
    if (keyQ.isDown) {
        playe.sprite.setFlipX(true);
        playe.sprite.setVelocityX(-vitesse);
    }
    if (keyD.isDown) {
        playe.sprite.setFlipX(false);
        playe.sprite.setVelocityX(vitesse);
    }
    if (keyZ.isDown)
        playe.sprite.setVelocityY(-vitesse);
    if (keyS.isDown)
        playe.sprite.setVelocityY(vitesse);
}

function update()
{
    for (let i = 0; i < 50; i++)
        monster[i].Move();
    for (let i = 0; i < 50; i++)
        monster[i].img.setPosition(monster[i].x, monster[i].y);
    modify_player_mvt(500);
    //modify_player_angle();
    //playe.sprite.setPosition(playe.x + playe.mv.x, playe.x + playe.mv.y);
    gemme1.forEach((g)=> {
        g.img.break_indicator();
    });
}

function animateSprite(sprite, name, indexs, delay) {
    let i = 1;
    setInterval(function() {
        if(i > indexs) {
            i = 1;
        }
        sprite.setTexture(name + i);
        i++;
    }, delay);
}
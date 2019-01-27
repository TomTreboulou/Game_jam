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

//console.log("fichier");

var game = new Phaser.Game(config);
//game.state.add('game', GameState, true);

var playe;

var keyZ, keyQ, keyS, keyD, keyW, keyX, keyC;

var test;
var monster;

var soul1;

var pioche;
var arc;
var coup;
//var monster;
var ting;
var rire;
var epee;
var switch_foot;

var collisionLeft;
var collisionRight;

var gemme1 = [];
var gemme2 = [];
var gemme3 = [];
var gemme4 = [];
var walls = [];

var time;

var button;
var button1;
var button2;

var occlusion;

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

    this.load.image('playerImg', 'img/player/player.png');
    this.load.image('player_run1', 'img/player/player_run1.png');
    this.load.image('player_run2', 'img/player/player_run2.png');
    this.load.image('player_attack1', 'img/player/player_attack1.png');
    this.load.image('player_attack2', 'img/player/player_attack2.png');
    this.load.image('player_attack3', 'img/player/player_attack3.png');


    this.load.image('collisionLeft', 'img/collisionLeft.png');
    this.load.image('collisionRight', 'img/collisionRight.png');
    this.load.image('monster2', 'monster2.png');
    this.load.image('facade', 'img/facade.png');
    this.load.image('toiture', 'img/toiture.png');
    this.load.image('haine1', 'img/monstres/haine/haine1.png');
    this.load.image('black', 'img/black.png');
    for(let i = 1; i <= 4; i++) {
        this.load.image('haine' + i, 'img/monstres/haine/haine' + i + '.png');
    }

    for(let i = 1; i <= 3; i++) {
        this.load.image('orb_red' + i, 'img/orbes/red/orb_red' + i + '.png');
    }

    this.load.image('nexus', 'img/NEXUS.png');

    this.load.image('hud', 'img/hud.png');

    this.load.image('occlusion', 'img/occlusion.png');

    this.load.image('ground', 'img/sol.png');

    // MUSIQUES
    this.load.audio('musiqueDeFond', 'son/musiques/fond.ogg');

    //SHOP
    this.load.image('axe', 'img/equipements/hache.png');
    this.load.image('sword', 'img/equipements/epee.png');
    this.load.image('chestplate', 'img/equipements/armure.png');

    // SON
    this.load.audio('coup', 'son/effets/bruit_coup.ogg');
    this.load.audio('monster', 'son/effets/monster.ogg');
    this.load.audio('pioche', 'son/effets/coup_pioche.ogg');
    this.load.audio('rire', 'son/effets/rire_monster.ogg');
    this.load.audio('ting', 'son/effets/ting.ogg');
    this.load.audio('epee', 'son/effets/coup_epee.ogg');
    this.load.audio('hache', 'son/effets/hache.mp3');
    this.load.audio('poing', 'son/effets/poing.mp3');

    // SPREADSHEETS
    //this.load.spritesheet('haine', 'monstres/haine.png', 37, 45, 18);
}

// Creer les elements du jeu
function create ()
{
    console.log("create");

    this.input.mouse.capture = true;

    //bg = this.add.tileSprite(0, 0, 1280, 720, 'bg');
    //bg = this.add.image(0, 0, 'bg').setOrigin(0);
    //bg.setScale(4.5);

    bg = this.add.tileSprite(0, 0, 1280 * 3, 720 * 3, 'ground').setOrigin(0);

    nexus = this.add.image(0, 3 * 720, 'nexus').setScale(0.3);

    collisionLeft = this.physics.add.image(0, 0, 'collisionLeft').setScale(0.4);
    collisionRight = this.physics.add.image(0, 0, 'collisionRight').setScale(0.4);
    collisionLeft.alpha = 0;
    collisionRight.alpha = 0;

    var music = this.sound.add('musiqueDeFond');
    music.play();
    pioche = this.sound.add('pioche');
    coup = this.sound.add('coup');
    monster = this.sound.add('monster');
    ting = this.sound.add('ting');
    rire = this.sound.add('rire');
    epee = this.sound.add('epee');
    hache = this.sound.add('hache');
    poing = this.sound.add('poing');

    //Create soul:

    //var gemme1 = new gemme(10, 10, 1, this);
    //var soul2 = new soul(100, 100, 2, 'soul2.png');

    this.cameras.main.setBounds(0, 0, 1280 * 3, 720 * 3);
    this.physics.world.setBounds(0, 0, 1280 * 3, 720 * 3);

    //var tileset = map.addTilesetImage('world', 'bg');
    //var layer = map.createStaticLayer('world', tileset, 0, 0);

    keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    // GEMMES
    for (var i = 0; i < 20; i++) {
        gemme1[i] = new gemme(Math.random() * 2000, Math.random() * 2000, 1, this, playe);
        /*gemme2[i] = new gemme(Math.random() * 2000, Math.random() * 2000, 2, this, playe);
        gemme3[i] = new gemme(Math.random() * 2000, Math.random() * 2000, 3, this, playe);
        gemme4[i] = new gemme(Math.random() * 2000, Math.random() * 2000, 4, this, playe);*/
    }

    // MONSTRES
    monster = [];
    for (let i = 0; i < 50; i++) {
        let k = Math.random() * 10000 + 3740;
        let j = Math.random() * k;
        monster[i] = new shadow(j,2160-Math.sqrt((k*k)-(j * j)),2,this.physics.add.image(0, 0, 'haine1'),0,720*3);
        animateSprite(monster[i].img, 'haine', 4, 500);
        this.physics.add.overlap(collisionLeft, monster[i].img, readyToAttack, null, this);
        this.physics.add.overlap(collisionRight, monster[i].img, readyToAttack, null, this);
    }

    // WALLS
    walls[0] = new wall(0, 0, this);
    walls[1] = new wall(0, 180, this);
    walls[2] = new wall(0, 180 * 2, this);
    walls[3] = new wall(0, 180 * 3, this);
    walls[4] = new wall(0, 180 * 4, this);
    walls[5] = new wall(90, 180 * 5, this);
    walls[6] = new wall(180, 180 * 6, this);
    walls[7] = new wall(180, 180 * 7, this);
    walls[8] = new wall(180, 0, this);
    walls[9] = new wall(180 * 2, 0, this);
    walls[10] = new wall(180 * 2, 180, this);
    walls[11] = new wall(180 * 2, 180 * 2, this);
    walls[12] = new wall(180 * 2, 180 * 3, this);
    walls[12] = new wall(270, 180 * 3, this);


    // PLAYER
    playe = new Player(this.physics.add.image(100, 1400, 'playerImg'),100,1400);
    playe.sprite.setCollideWorldBounds(true);
    playe.sprite.setScale(0.4);
    playe.lifeText = this.add.text(0, 0, "100 Pv", {font: "20px Arial", fill: "255"}).setOrigin(0.5);

    // Proprietes gemmes
    gemme1.forEach((g) => {
        this.physics.add.overlap(playe.sprite, g.img, collectSoul, null, this);
    });
    walls.forEach((w)=> {
        this.physics.add.overlap(playe.sprite, w.hitbox, my_collision(playe.mv), null, this);
        //this.physics.add.collider(playe, w);
    });
    // NEXUS
    brain = new nexusClass(0, 2160);

    // CAMERA
    this.cameras.main.startFollow(playe.sprite, true, 0.5, 0.5);

    occlusion = this.add.image(0, 0, 'occlusion').setOrigin(0.5);

    hud = this.add.image(0, 0, 'hud').setOrigin(0).setScrollFactor(0);
    soul1 = new soul(800, 43, 1, this);

    time = new timer(this);
    time.settime(00, 7, this);
}

function actionButton(game) {
    if ((playe.sprite.x >= 0 && playe.sprite.x <= 720) && (playe.sprite.y >= 2 * 720 && playe.sprite.y <= 3 * 720)) {
        if (keyW.isDown && soul1.compt.compt >= 50) {
            sword = game.add.image(75, 592, 'sword').setOrigin(0).setScrollFactor(0);
            soul1.compt.compt -= 50;
            ting.play();
        }
        if (keyX.isDown && soul1.compt.compt >= 30) {
            axe = game.add.image(145, 597, 'axe').setOrigin(0).setScrollFactor(0);
            soul1.compt.compt -= 30;
            ting.play();
        }
        if (keyC.isDown && soul1.compt.compt >= 35) {
            console.log("Achat effectue");
            armor = game.add.image(220, 595, 'chestplate').setOrigin(0).setScrollFactor(0);
            soul1.compt.compt -= 35;
            ting.play();
        }
    }
}

function my_collision() {
    if (playe.mv.x != 0)
        playe.mv.x = 0;
    else if (playe.mv.y != 0)
        playe.mv.y = 0;
}

// p = player; m = monster
function readyToAttack(p, m) {
    if(playe.attackDelay <= 0) {
        if(keyRight.isDown) {
            playe.attackDelay = 50;
            m.life--;
            playe.isAnimated = true;
            playe.sprite.setTexture("player_attack1");
            setTimeout(() => {
                playe.sprite.setTexture("player_attack2");
                poing.play();
                setTimeout(() => {
                    playe.sprite.setTexture("player_attack3");
                    setTimeout(() => {
                        playe.isAnimated = false;
                    }, 150);
                }, 150);
            }, 150);
        }
        if(keyLeft.isDown) {
            playe.attackDelay = 50;
            m.life--;
            playe.isAnimated = true;
            playe.sprite.setTexture("player_attack1");
            setTimeout(() => {
                playe.sprite.setTexture("player_attack2");
                poing.play();
                setTimeout(() => {
                    playe.sprite.setTexture("player_attack3");
                    setTimeout(() => {
                        playe.isAnimated = false;
                    }, 150);
                }, 150);
            }, 150);
        }
    }
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
var tempInterv = 0;
function modify_player_mvt(vitesse) {
    playe.sprite.isMoving = false;
    playe.sprite.setVelocity(0);
    if (keyQ.isDown) {
        playe.sprite.isMoving = true;
        playe.sprite.setFlipX(true);
        playe.sprite.setVelocityX(-vitesse);
    }
    if (keyD.isDown) {
        playe.sprite.isMoving = true;
        playe.sprite.setFlipX(false);
        playe.sprite.setVelocityX(vitesse);
    }
    if (keyZ.isDown) {
        playe.sprite.isMoving = true;
        playe.sprite.setVelocityY(-vitesse);
    }
    if (keyS.isDown) {
        playe.sprite.isMoving = true;
        playe.sprite.setVelocityY(vitesse);
    }

    if(playe.sprite.isMoving) {
        tempInterv++;
        if(tempInterv % 20 == 0) {
            playe.sprite.setTexture("player_run1");
        } else if(tempInterv % 10 == 0) {
            playe.sprite.setTexture("player_run2");
        }
    } else if(!playe.isAnimated) {
        playe.sprite.setTexture("playerImg");
    }

}

function update()
{
    actionButton(this);
    //this.physics.add.collider(playe.sprite, monster.img);
    for (let i = 0; i < 50 && time.min < 0; i++)
        monster[i].Move();
    for (let i = 0; i < 50; i++) {
        if (monster[i].img.life > 0 && ((monster[i].xobj-monster[i].x)*(monster[i].xobj-monster[i].x)+(monster[i].yobj-monster[i].y)*(monster[i].yobj-monster[i].y)) <= 10000) {
            monster[i].img.life = 0;
            brain.Dgt();
        }
        else if (monster[i].img.life > 0)
            monster[i].img.setPosition(monster[i].x, monster[i].y);
        if (monster[i].img.life <= 0) {
            //console.log("Le monstre numero " + i + " est mort.");
            monster[i].img.disableBody(true, true);
        }
    }
    if (brain.life == 0) {
        alert("Game Over");
        brain.life--;
    }
    modify_player_mvt(500);
    //modify_player_angle();
    //playe.sprite.setPosition(playe.x + playe.mv.x, playe.x + playe.mv.y);
    gemme1.forEach((g)=> {
        g.img.break_indicator();
    });

    // Collisions
    collisionLeft.setPosition(playe.sprite.x - 50, playe.sprite.y);
    collisionRight.setPosition(playe.sprite.x + 50, playe.sprite.y);
    playe.update();

    occlusion.setPosition(playe.sprite.x, playe.sprite.y);
}

let animations = [];
function animateSprite(sprite, name, indexs, delay) {
    let i = 1;
    animations[name] = setInterval(function() {
        if(i > indexs) {
            i = 1;
        }
        sprite.setTexture(name + i);
        i++;
    }, delay);
}
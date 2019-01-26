/* //creation spritesheet
var game = new Phaser.Game(800,600,Phaser.AUTO,'content',{preload: preload, create:
    create,update:update});
    function preload(){
    game.load.spritesheet('spriteSonic','asset/sonicsprites.png',48,48);
    }
    function create(){
    sonic=game.add.sprite(400,300,'spriteSonic');
    sonic.anchor.setTo (0.5,0.5);
    sonic.animations.add('marche',[0,1,2,3,4,5],10,true);
    sonic.play('marche');
    }
    function update(){
    }

    //animation spritesheet
    var game = new Phaser.Game(800,600,Phaser.AUTO,'content',{preload: preload, create:
        create,update:update});
        function preload(){
        game.load.spritesheet('spriteSonic','asset/sonicsprites.png',48,48);
        }
        function create(){
        sonic=game.add.sprite(400,300,'spriteSonic');
        sonic.anchor.setTo (0.5,0.5);
        sonic.animations.add('marche',[0,1,2,3,4,5],10,true);
        sonic.frame=6;
        }
        function anim(){
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        sonic.scale.x=-1;
        sonic.play('marche');
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        sonic.scale.x=1;
        sonic.play('marche');
        }
        }
        function update(){
        anim();
        }*/

        /*var game = new Phaser.Game(800,600,Phaser.AUTO,'content',{preload: preload, create:
            create,update:update});
            function preload(){
            game.load.image('smiley','asset/smiley.png');
            }
            function create(){
            monGroupe=game.add.group();
            for (var i=0;i<10;i++){
            monGroupe.create(750*Math.random(), 550*Math.random(),'smiley');
            }
            }
            function update(){
            }*/
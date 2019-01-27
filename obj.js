class Player {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.mv = {x: 0, y: 0};
        this.attackDelay = 0;

        this.isAnimated = false;
        this.isMoving = false;
    }
    setMove(x, y) {
        this.mv.x = x;
        this.mv.y = y;
    }
    update() {
        if(this.attackDelay > 0) {
            this.attackDelay -= 1;
        }
        this.lifeText.setPosition(this.sprite.x, this.sprite.y + 70);
    }
}

class shadow {
    constructor(x, y, type, sprite, xobj, yobj) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.img = sprite;
        this.xobj = xobj;
        this.yobj = yobj;
        this.img.life = 2;
    }
    Move() {
        if (this.x - this.xobj < 1 && this.x - this.xobj > -1 && this.y - this.yobj < 1 && this.y - this.yobj > -1) {
            this.x = this.xobj;
            this.y = this.yobj;
        }
        else {
            this.x += (this.xobj - this.x) / (Math.sqrt(((this.x - this.xobj) * (this.x - this.xobj)) + ((this.y - this.yobj) * (this.y - this.yobj))));
            this.y += (this.yobj - this.y) / Math.sqrt((((this.x - this.xobj) * (this.x - this.xobj)) + ((this.y - this.yobj) * (this.y - this.yobj))));
        }
    }
    SetObj(x,y) {
        this.xobj = x;
        this.yobj = y;
    }
}

class timer {
    constructor(game) {
        this.second = 0;
        this.min = 0;
        this.text = game.add.text(20, 20, "", {font: "30px Arial", fill: "#fff"}).setScrollFactor(0);
    }
    draw_t() {
        this.second --;
        if (this.second <= 0) {
            this.second = 59;
            this.min --;
        }
        if (this.second < 10) {
            this.text.setText(this.min + ":0" + this.second);
        }
        else {
            this.text.setText(this.min + ":" + this.second);
        }
    }
    settime(s , m, game) {
        this.second = s;
        this.min = m;
        setInterval(() => {
            this.draw_t(this);
        }, 1000);
    }
    delete() {
        this.text.destroy();
    }
}

class compt {
    constructor(x, y, game) {
        this.compt = 0;
        this.text = game.add.text(x, y, "0", {font: "20px Arial", fill: "255"});
        this.text.setScrollFactor(0);
    }
    add(nb) {
        this.compt += nb;
        this.text.setText(this.compt);
    }
    set(nb) {
        this.compt = nb;
        this.text.setText(this.compt);
    }
    get() {
        return (this.compt);
    }
    delete() {
        this.text.destroy();
    }
}

class soul {
    constructor(x, y, type, game) {
        this.type = type;
        this.compt = new compt(x ,y, game);
    }
    add(nb, game) {
        this.compt.add(nb, game);
    }
}

class wall {
    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.size = 180;
        this.toiture = game.add.image(this.x, this.y, 'toiture');
        this.toiture.setScale(0.5);
        this.facade = game.add.image(this.x, this.y + this.size, 'facade');
        this.facade.setScale(0.5);
        this.hitbox = game.physics.add.staticGroup();
        this.hitbox = this.hitbox.create(this.x, this.y + this.size, 'toiture').alpha = 0;
    }
}

class gemme {
    constructor(x, y, type, game, playe) {
        this.x = x;
        this.y = y;
        this.img = game.physics.add.image(x, y, 'orb_red1');
        this.img.setScale(0.5);
        this.type = type;
        this.img.hp = 100;
        this.img.break_indicator = function() {
            if (this.hp != 100) {
                if (this.hp == 99) {
                    pioche.play();
                    soul1.add(1);
                    this.hp -= 1;
                }
                if (this.hp == 50) {
                    pioche.play();
                    soul1.add(1);
                    this.hp -= 1;
                }
                if (this.hp == 1) {
                    pioche.play();
                    soul1.add(1);
                    this.hp -= 1;
                }
                if (this.hp > 50) {
                    this.setTexture('orb_red2');
                } else if (this.hp > 0) {
                    this.setTexture('orb_red3');
            }
        }
    }
    }
    hit(x) {
        this.hp -= x;
    }
    delete() {
        this.text.destroy();
    }
    check(playe) {
        if (playe.x < this.x + 300 && playe.x > this.x && playe.y < this.y + 400 && playe.y > this.y)
            this.delete()
    }
}

class inventory {
    constructor() {
        this.epee = false;
        this.arc = false;
    }
    addItem(item, game) {
        switch(item) {
            case 'epee':
                this.epee = true;
                game.add.image(0, 0, 'img/epee.png');
                break;
            case 'arc':
                this.arc = true;
                game.add.image(100, 0, 'img/arc.png');
                break;
            default:
                console.log("Item not found");
        }
    }
}

class nexusClass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 10;
        this.wall = 0;
    }
    Dgt() {
        if (this.wall > 0)
            wall--;
        else
            this.life--;
    }
}
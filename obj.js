class Player {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.mv = {x: 0, y: 0};
    }
    setMove(x, y) {
        this.mv.x = x;
        this.mv.y = y;
    }
    attack() {
        monster.forEach((m) => {
            
        });
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
    constructor() {
        this.second = 0;
        this.min = 0;
        this.text = game.add.text(20, 20, "", {font: "30px Arial", fill: "#fff"});
    }
    draw_t() {
        this.second --;
        if (this.second <= 0) {
            this.second = 59;
            this.min --;
        }
        if (this.second < 10)
            this.text.setText(this.min + ":0" + this.second);
        else
            this.text.setText(this.min + ":" + this.second);
        }
    settime(s , m, game) {
        this.second = s;
        this.min = m;
        this.timer = game.time.events.loop(1000, this.draw_t, this);
    }
    delete() {
        this.text.destroy();
    }
    gettime() {
        if (this.second <= 0 && this.min <= 0)
            return (1);
        else
            return (0);
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

class block {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size * 2;
    }
}

/*class ath {
    constructor(x, y, type, game) {
        this.x = x;
        this.y = y;
        this.img = game.add.image(x, y, 'ath' + type)
        this.type = type;
    }
}
    */


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
class nexus {
    constructor() {
        this.x = 0;
        this.y = 720 * 3;
        this.img = game.add.image(this.x, this.y, 'nexus.png');
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
class obj {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    updatePos(x, y) {
        this.x = x;
        this.y = y;
    }
    show() {
        // Afficher le sprite
        console.log("prout");
    }
}
var truc = new obj(0, 0);
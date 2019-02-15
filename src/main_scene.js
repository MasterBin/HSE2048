import FieldManager from "./FieldManager.js";
import KeyHandler from "./KeyHandler.js";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
<<<<<<< HEAD

        this._moveHandler = (x, y) => {
            this.tile.x += x;
            this.tile.y -= y;
            console.log(this.tile.x + " "+ this.tile.y);
        };

        this._addNewTile() = () => {
            //TODO:
        };
=======
        this.tile;
>>>>>>> 8e5ea44f6b5672fbdb2925305fdf5c10092b43b3
    }

	preload() {
        this.load.image('tile', 'assets/minisquare.png');
        this.load.image('field',"assets/field.png");
    }
    
	create() {
        
<<<<<<< HEAD
        this.keyHandler = new KeyHandler(this, this._moveHandler);
        this.fieldManager = new FieldManager(this);

        this.tile = this.add.sprite(50, 50, 'tile');
=======
        this.keyHandler = new KeyHandler(this, this.moveHandler);
        //this.fieldManager = new FieldManager(this);

        //delete it a
        tile = this.add.image(50,50, 'tile');

        
    }

    moveHandler (x, y) {
        console.log(x + " "+ y);
        tile.x += x*10;
        tile.y -= y*10;
>>>>>>> 8e5ea44f6b5672fbdb2925305fdf5c10092b43b3
    }
    
    //update() {}

        
}

let tile;

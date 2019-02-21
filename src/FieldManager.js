import FieldAnimation from "./FieldAnimation.js";

//import FieldAnimation from "./FieldAnimation";

// Will manipulate field. Updates it and recives all events from keys.
export default class FieldManager {

    constructor (mainScene, sceneConfig) {
        this.sceneConfig = sceneConfig;
        this.mainScene = mainScene;
        mainScene.add.image(250,250,'field');
        this.array = [];
        this.paused = false;
        this.started = false;
        this.animation = new FieldAnimation(this, mainScene);
        this.keyPresed;
        this.canMove = true;
    }

    start() {
        if (this.started) {
            if (this.paused) {
                this.pause = false;
            }
            else {
                for (let i = 0; i < 4; ++i) {
                    for (let j = 0; j < 4; ++j) {
                        this.array[i][j].increased = false;
                        this.array[i][j].num = 0;
                    }
                }

                _reload();
            }
        }
        else {
            this.started = true;
            this._init();
            this._addNewTile();
            this._addNewTile();
            //this.playAnimation();
        }
    }

    pause() {
        if (this.started) {
            this.paused = true;
        }
    }


    redraw(){
        for (let i = 0; i < 4; ++i){
            for (let j = 0; j < 4; ++j) {
                this.array[i][j].sprite.visible = false;
                this.array[i][j].sprite.setFrame(this.array[i][j].num - 1 > -1 ? this.array[i][j].num - 1 : 0);
                this.array[i][j].sprite.x = this._tilePosition(j);
                this.array[i][j].sprite.y = this._tilePosition(i);
                if (this.array[i][j].num > 0){
                    this.array[i][j].sprite.visible = true;
                }

                this.array[i][j].increased = false;
            }
        }
        this._addNewTile(false);
    }
    

    moveHandler(x,y) {
        this.canMove = false;
        if (! this.started || this.paused)
            return;

        this.animation.stop();

        let somethingMoved = false;
        for (let i = 0; i < 4; ++i){
            for (let j = 0; j < 4; ++j) {
                
                let curRow = ( y == 1 )? 3 - i : i;
                let curCol = ( x == 1 )? 3 - j : j;
                let current = this.array[curRow][curCol];


                if (current.num == 0)
                    continue;
                
                let shiftRow = y;
                let shiftCol = x;

                while (this._fitToField(curCol + shiftCol, curRow + shiftRow) &&
                            this.array[curRow + shiftRow][curCol + shiftCol].num == 0) {
                    
                    shiftCol += x;
                    shiftRow += y;
                }

                if (this._fitToField(curCol + shiftCol, curRow + shiftRow) &&
                        this.array[curRow + shiftRow][curCol + shiftCol].num == current.num &&
                        this.array[curRow + shiftRow][curCol + shiftCol].increased == false) {
                    
                    this.array[curRow][curCol].num = 0;
                    this.array[curRow + shiftRow][curCol + shiftCol].num += 1;
                    this.array[curRow + shiftRow][curCol + shiftCol].increased = true;

                    this.array[curRow][curCol].sprite.destination = { x: this._tilePosition(curCol + shiftCol), 
                                                                      y: this._tilePosition(curRow + shiftRow)};
                    this.animation.addMovement(this.array[curRow][curCol].sprite);

                    somethingMoved = true;
                }
                else {

                    shiftCol -= x;
                    shiftRow -= y;
                    if (shiftCol != 0 || shiftRow != 0) {
                        this.array[curRow + shiftRow][curCol + shiftCol].num = current.num;
                        this.array[curRow][curCol].num = 0;

                        this.array[curRow][curCol].sprite.destination = { x: this._tilePosition(curCol + shiftCol), 
                                                                          y: this._tilePosition(curRow + shiftRow)};
                        this.animation.addMovement(this.array[curRow][curCol].sprite)
                        
                        somethingMoved = true;
                    }
                }
            }
        }

        if (somethingMoved){
            this.animation.doMove();
        }
        else{
            this.canMove = true;
        }
    }

    _fitToField(x, y) {
        return ( x>=0 && x<4 ) && ( y>=0 && y<4 );
    }

    _addNewTile (animated) {
        let emptyTiles = [];
        for(let i = 0; i < 4; ++i) {
            for(let j = 0; j < 4; ++j) {
                if(this.array[i][j].num == 0) {
                    emptyTiles.push( {
                        row: i,
                        col: j
                    })
                }
            }
        }
        let newTileIndex = Phaser.Utils.Array.GetRandom(emptyTiles);
        let newTile = this.array[newTileIndex.row][newTileIndex.col];
        newTile.num = 1;
        newTile.sprite.visible = true;
        newTile.sprite.setFrame(0)
    }
    
    _tilePosition(pos) {
        return (this.sceneConfig.tileSize + this.sceneConfig.spacing) * ((pos < 0)? -pos : pos) +
                        this.sceneConfig.tileSize/2 + this.sceneConfig.spacing;
    }

    _init() {
        for (let i = 0; i < 4; ++i) {
            this.array[i] = [];
            for (let j = 0; j < 4; ++j) {
                let tile = this.mainScene.add.sprite(this._tilePosition(j),this._tilePosition(i), 'tiles');
                tile.alpha = 1;
                tile.visible = false;
                tile.destination = { x: -1, y: -1 };
                this.array[i][j] = {
                    sprite: tile,
                    num: 0,
                    increased: false
                };
            }
        }
    }
}
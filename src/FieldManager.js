import FieldAnimation from "./FieldAnimation.js";

export const gameState = { WIN: 0,
                LOSE: 1,
                USUAL: 2};

// Will manipulate field. Updates it and recives all events from keys.
export default class FieldManager {

    constructor(mainScene, sceneConfig) {
        this.sceneConfig = sceneConfig;
        this.mainScene = mainScene;
        this.animation = new FieldAnimation(this, mainScene);
        mainScene.add.image(250, 250, 'field');
        this.array = [];
        this.paused = false;
        this.started = false;
        this.canMove = true;
        this.canAnimate = true;
        this.toIncrease = 0;
        this.emptyTiles = [];
        this.state = gameState.USUAL;
    }

    start() {
        if (!this.started) {
            this.started = true;
            this._init();
            this._addNewTile();
            this._addNewTile();
        }
    }

    pause() {
        if (this.started) {
            this.paused = true;
        }
    }

    resume() {
        if (this.started) {
            this.paused = false;
        }
    }

    restart() {
        if (this.started) {
            for (let i = 0; i < 4; ++i) {
                for (let j = 0; j < 4; ++j) {
                    this.array[i][j].increased = false;
                    this.array[i][j].num = 0;
                }
            }
            _redraw();
        }
    }

    
    _checkGameOver(){
        this.emptyTiles = this._findEmptyTiles();
        if (this.emptyTiles.length > 1){
            return;
        }
        let moves = {
            0: { x: 0,  y: -1 }, // Up
            1: { x: 0,  y: 1  }, // Down
            2: { x: -1, y: 0  }, // Left
            3: { x: 1,  y: 0  }  // Right
        }
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                for(let direction = 0; direction < 4; direction++){
                    let curNum = this.array[i][j].num;
                    if (curNum > 0){
                        let otherTile = { x: i + moves[direction].x, y: j + moves[direction].y };
                        if (this._fitToField(otherTile.x, otherTile.y) && curNum == this.array[otherTile.x][otherTile.y].num){
                            return;
                        }
                    }
                }
            }
        }
        console.log("lose");
        this.state = gameState.LOSE;
        this.paused = true;
    }


    _redraw() {
        this.canMove = false;
        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {
                this.array[i][j].visible = false;
                this.array[i][j].setFrame(this.array[i][j].num - 1 > -1 ? this.array[i][j].num - 1 : 0);
                this.array[i][j].x = this._tilePosition(j);
                this.array[i][j].y = this._tilePosition(i);
                if (this.array[i][j].num > 0) {
                    this.array[i][j].visible = true;
                }
                if (this.array[i][j].increased && this.canAnimate) {
                    this.toIncrease++;
                    this.animation.addMovement(this.array[i][j]);
                }
                this.array[i][j].increased = false;
            }
        }

        this._addNewTile();
        if (this.canAnimate && this.toIncrease > 0) {
            this.animation.doIncrease();
        }

        this.canAnimate = true;
    }


    moveHandler(x, y) {
        if (!this.canMove){
            return;
        }
        this.canMove = false;

        if (!this.started || this.paused)
            return;


        this.animation.stop();

        let somethingMoved = false;
        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {

                let curRow = (y == 1) ? 3 - i : i;
                let curCol = (x == 1) ? 3 - j : j;
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

                    if (this.array[curRow + shiftRow][curCol + shiftCol].num == 9){ //WIN
                        this.state = gameState.WIN;
                        this.paused = true;
                    }

                    this.array[curRow + shiftRow][curCol + shiftCol].increased = true;

                    this.array[curRow][curCol].destination = {
                        x: this._tilePosition(curCol + shiftCol),
                        y: this._tilePosition(curRow + shiftRow)
                    };
                    this.animation.addMovement(this.array[curRow][curCol]);

                    somethingMoved = true;
                }
                else {

                    shiftCol -= x;
                    shiftRow -= y;
                    if (shiftCol != 0 || shiftRow != 0) {
                        this.array[curRow + shiftRow][curCol + shiftCol].num = current.num;
                        this.array[curRow][curCol].num = 0;

                        this.array[curRow][curCol].destination = {
                            x: this._tilePosition(curCol + shiftCol),
                            y: this._tilePosition(curRow + shiftRow)
                        };
                        this.animation.addMovement(this.array[curRow][curCol])

                        somethingMoved = true;
                    }
                }
            }
        }

        if (somethingMoved) {
            this._checkGameOver();
            this.animation.doMove();
        }
        else {
            this.canMove = true;
        }
    }

    _fitToField(x, y) {
        return (x >= 0 && x < 4) && (y >= 0 && y < 4);
    }

    _findEmptyTiles(){
        let tiles = [];
        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {
                if (this.array[i][j].num == 0) {
                    tiles.push({
                        row: i,
                        col: j
                    })
                }
            }
        }
        return tiles;
    }

    _addNewTile() {
        let newTileIndex = Phaser.Utils.Array.GetRandom(this.emptyTiles);
        let newTile = this.array[newTileIndex.row][newTileIndex.col];
        newTile.num = 1;
        newTile.setFrame(0)
        newTile.visible = false;
        if (this.canAnimate) {
            this.animation.doApperance(newTile);
        }
        else {
            newTile.visible = true;
        }
    }

    _tilePosition(pos) {
        return (this.sceneConfig.tileSize + this.sceneConfig.spacing) * ((pos < 0) ? -pos : pos) +
            this.sceneConfig.tileSize / 2 + this.sceneConfig.spacing;
    }

    _init() {
        for (let i = 0; i < 4; ++i) {
            this.array[i] = [];
            for (let j = 0; j < 4; ++j) {
                let tile = this.mainScene.add.sprite(this._tilePosition(j), this._tilePosition(i), 'tiles');
                tile.alpha = 1;
                tile.visible = false;
                tile.destination = { x: -1, y: -1 };
                tile.num = 0;
                tile.increased = false;
                this.array[i][j] = tile;
            }
        }
        this.emptyTiles = this._findEmptyTiles();
    }


    // TODO
    GameLose(){
        this.mainScene.add.text(250, 250, "LOSE", {
            font: "bold 128px Arial",
            align: "center",
            color: "red",
            align: "center"
        });
    }

    // TODO
    GameWin(){
        this.mainScene.add.text(250, 250, "WIN",{
            font: "bold 128px Arial",
            align: "center",
            color: "green",
            align: "center"
        });
    }
}
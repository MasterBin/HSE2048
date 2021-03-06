import FieldAnimation from "./FieldAnimation.js";

export const gameState = {
    WIN: 0,
    LOSE: 1,
    USUAL: 2
};

// Will manipulate field. Updates it and recives all events from keys.
export default class FieldManager {

    constructor(mainScene, sceneConfig) {
        this.sceneConfig = sceneConfig;
        this.mainScene = mainScene;
        this.animation = new FieldAnimation(this, mainScene);

        this.array = [];
        this.paused = false;
        this.started = false;
        this.canMove = true;
        this.canAnimate = true;
        this.toIncrease = 0;
        this.emptyTiles = [];
        this.state = gameState.USUAL;
        this.notWin = true;
        this.newTileNum = 1;

        this.score = 0;

        mainScene.events.on("onMoved", this.moveHandler, this);
    }

    start() {
        if (!this.started) {

            this.started = true;
            this._init();
            this._addNewTile();
            this._findEmptyTiles();
            this._addNewTile();
            this.sendScore();
        }
    }

    pause() {
        if (this.started)
            this.paused = true;
    }

    resume() {
        if (this.started) 
            this.paused = false;
    }

    restart() {
        if (this.started) {
            for (let i = 0; i < 4; ++i) {
                for (let j = 0; j < 4; ++j) {
                    this.array[i][j].increased = false;
                    this.array[i][j].num = 0;
                }
            }
            this.notWin = true;
            this._addNewTile();
            this._findEmptyTiles();
            this._redraw();
            this.score = 0;
            this.sendScore();
        }

        if (this.paused)
            this.paused = false;
    }

    sendScore () {
        this.mainScene.events.emit('onScoreChanged', this.score);
    }
 
    GameLose() {
        this.mainScene.events.emit('onGameLose', this.score);
        this.state = gameState.USUAL;
    }

    GameWin() {
        this.mainScene.events.emit('onGameWin', this.score);
        this.state = gameState.USUAL;
    }


    _checkGameOver() {
        this._findEmptyTiles();
        if (this.emptyTiles.length > 1) {
            return;
        }
        let moves = {
            0: { x: 0, y: -1 }, // Up
            1: { x: 0, y: 1 }, // Down
            2: { x: -1, y: 0 }, // Left
            3: { x: 1, y: 0 }  // Right
        }
        this.array[this.emptyTiles[0].row][this.emptyTiles[0].col].num = this.newTileNum; // Temporary change for this tile 

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let direction = 0; direction < 4; direction++) {
                    let curNum = this.array[i][j].num;
                    if (curNum > 0) {
                        let otherTile = { x: i + moves[direction].x, y: j + moves[direction].y };
                        if (this._fitToField(otherTile.x, otherTile.y) && curNum == this.array[otherTile.x][otherTile.y].num) {
                            this.array[this.emptyTiles[0].row][this.emptyTiles[0].col].num = 0; // Сancel temporary change
                            return;
                        }
                    }
                }
            }
        }

        
        this.state = gameState.LOSE;
        this.paused = true;
    }


    _redraw() {
        this.canMove = false;
        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {
                this.array[i][j].visible = false;
                this.array[i][j].setFrame(this.array[i][j].num - 1 > -1 ? this.array[i][j].num - 1 : 0);
                let tilePos = this._tilePosition(i, j);
                this.array[i][j].x = tilePos.x;
                this.array[i][j].y = tilePos.y;
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
    

        if (!this.started || this.paused){
            return;
        }

        this.canMove = false;

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
                    
                    // set new score 
                    this.score += Math.pow(2,this.array[curRow + shiftRow][curCol + shiftCol].num);
                    if(this.score > this.bestScore) {
                        this.bestScore = this.score;
                        this.mainScene.ui.bestScoreChanged(this.bestScore);
                        this.mainScene.storage.putToStorage(this.bestScore, "bestScore")
                    }

                    if (this.array[curRow + shiftRow][curCol + shiftCol].num == 11 && this.notWin) { //WIN
                        this.state = gameState.WIN;
                        this.paused = true;
                        this.notWin = false;
                    }

                    this.array[curRow + shiftRow][curCol + shiftCol].increased = true;

                    let newTilePos = this._tilePosition(curRow + shiftRow, curCol + shiftCol);
                    this.array[curRow][curCol].destination = {
                        x: newTilePos.x,
                        y: newTilePos.y
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

                        let newTilePos = this._tilePosition(curRow + shiftRow, curCol + shiftCol);
                        this.array[curRow][curCol].destination = {
                            x: newTilePos.x,
                            y: newTilePos.y
                        };
                        this.animation.addMovement(this.array[curRow][curCol])

                        somethingMoved = true;
                    }
                }
            }
        }

        if (somethingMoved) {
            this.newTileNum = Math.random() < 0.85 ? 1 : 2;
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

    _findEmptyTiles() {
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
        this.emptyTiles = tiles;
    }

    _addNewTile() {
        let newTileIndex = Phaser.Utils.Array.GetRandom(this.emptyTiles);
        let newTile = this.array[newTileIndex.row][newTileIndex.col];
        newTile.num = this.newTileNum;
        newTile.setFrame(newTile.num - 1);
        newTile.visible = false;
        if (this.canAnimate) {
            this.animation.doApperance(newTile);
        }
        else {
            newTile.visible = true;
        }
    }

    _position(pos) {
        return (this.sceneConfig.tileSize + this.sceneConfig.spacing) * pos +
            this.sceneConfig.tileSize / 2 + this.sceneConfig.spacing;
    }

    _tilePosition(i, j) {
        return {
            x: this._position(j),
            y: this.sceneConfig.fieldX + this._position(i)
        };
    }

    _init() {
        for (let i = 0; i < 4; ++i) {
            this.array[i] = [];
            for (let j = 0; j < 4; ++j) {
                let tilePos = this._tilePosition(i, j);
                let tile = this.mainScene.add.sprite(tilePos.x, tilePos.y, 'tiles');
                tile.alpha = 1;
                tile.visible = false;
                tile.destination = { x: -1, y: -1 };
                tile.num = 0;
                tile.increased = false;
                this.array[i][j] = tile;
            }
        }
        this._findEmptyTiles();
    }


}

// Will manipulate field. Updates it and recives all events from keys.
export default class FieldManager {

    constructor (game, sceneConfig) {
        this.sceneConfig = sceneConfig;
        this.game = game;
        this.field = game.add.image(250,250,'field');
        this.array = [];
        this.group = game.add.group();

        this._init();
    }

    //TODO delete
    _reload() {
        for (let i = 0; i < 4; ++i){
            for (let j = 0; j < 4; ++j) {
                this.array[i][j].increased = false;
            }
        }
    }

    moveHandler(x,y) {
        let somethingMoved = false;
        for (let i = 0; i < 4; ++i){
            for (let j = 0; j < 4; ++j) {
                
                // начнем с конца
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
                    //TODO: delete
                    this.array[curRow][curCol].text.setText('');

                    this.array[curRow + shiftRow][curCol + shiftCol].num *= 2;
                    //TODO: delete
                    this.array[curRow + shiftRow][curCol + shiftCol].text.setText(JSON.stringify(this.array[curRow + shiftRow][curCol + shiftCol].num));

                    this.array[curRow + shiftRow][curCol + shiftCol].increased = true;
                    somethingMoved = true;
                }
                else {

                    shiftCol -= x;
                    shiftRow -= y;
                    if (shiftCol != 0 || shiftRow != 0) {
                        this.array[curRow + shiftRow][curCol + shiftCol].num = current.num;
                        this.array[curRow + shiftRow][curCol + shiftCol].text.setText(JSON.stringify(current.num));
                        this.array[curRow][curCol].num = 0;
                        //TODO: delete
                        this.array[curRow][curCol].text.setText('');
                        
                        somethingMoved = true;
                    }
                }
            }
        }

        if (somethingMoved)
            this.addNewTile();

        this._reload();
    }

    _fitToField(x, y) {
        return ( x>=0 && x<4 ) && ( y>=0 && y<4 );
    }

    addNewTile () {
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
        newTile.num = 2;
        //TODO: delete
        newTile.text.setText('2');
        //newTile.sprite.visible = true;
    }
    
    _tilePosition(pos) {
        return (this.sceneConfig.tileSize + this.sceneConfig.spacing) * ((pos < 0)? -pos : pos) +
                        this.sceneConfig.tileSize/2 + this.sceneConfig.spacing;
    }

    _init() {
        for (let i = 0; i < 4; ++i) {
            this.array[i] = [];
            for (let j = 0; j < 4; ++j) {
                let tile = this.game.add.sprite(this._tilePosition(j),this._tilePosition(i), 'tile');
                //TODO: delete
                let text = this.game.add.text(this._tilePosition(j) - 20,this._tilePosition(i) - 20, '', {
                    font: "bold 64px Arial",
                    align: "center",
                    color: "black",
                })
                tile.alpha = 0.5;// TODO 0
                tile.visible = 0; // TODO 0
                this.group.add(tile);
                this.array[i][j] = {
                    sprite: tile,
                    num: 0,
                    increased: false,
                    //TODO: delete
                    text: text
                };
            }
        }
    }
}
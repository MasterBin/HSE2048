// Will manipulate field. Updates it and recives all events from keys.
export default class FieldManager {

    constructor (mainScene, sceneConfig) {
        this.sceneConfig = sceneConfig;
        this.mainScene = mainScene;
        this.field = mainScene.add.image(250,250,'field');
        this.array = [];
        this.group = mainScene.add.group();
        this.fakeTiles = [];
        this.fakeTilesSprits = [];
        this._init();
    }

    _reload() {
        for (let i = 0; i < 4; ++i){
            for (let j = 0; j < 4; ++j) {
                this.array[i][j].increased = false;
                if (this.array[i][j].num > 0){
                    this.array[i][j].sprite.setFrame(this.array[i][j].num - 1);
                    this.array[i][j].sprite.visible = true;
                }
            }
        }
    }

    moveHandler(x,y) {
        let somethingMoved = false;
        let toMove = [];
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
                    this.array[curRow][curCol].sprite.visible = false;

                    this.array[curRow + shiftRow][curCol + shiftCol].num += 1;
                    //this.array[curRow + shiftRow][curCol + shiftCol].sprite.setFrame(this.array[curRow + shiftRow][curCol + shiftCol].num - 1);
                    //this.array[curRow + shiftRow][curCol + shiftCol].sprite.visible = false;

                    this.array[curRow + shiftRow][curCol + shiftCol].increased = true;

                    this.fakeTiles.push({ tile: {x: this._tilePosition(curCol), y: this._tilePosition(curRow), num: this.array[curRow + shiftRow][curCol + shiftCol].num}, 
                                    y: this._tilePosition(curRow + shiftRow), 
                                    x: this._tilePosition(curCol + shiftCol),
                                    incr: true
                    });
                    somethingMoved = true;
                }
                else {

                    shiftCol -= x;
                    shiftRow -= y;
                    if (shiftCol != 0 || shiftRow != 0) {
                        this.array[curRow + shiftRow][curCol + shiftCol].num = current.num;
                        this.array[curRow + shiftRow][curCol + shiftCol].sprite.setFrame(current.num - 1);
                        this.array[curRow + shiftRow][curCol + shiftCol].sprite.visible = false;

                        this.array[curRow][curCol].num = 0;
                        this.array[curRow][curCol].sprite.visible = false;
                        this.fakeTiles.push({ tile: {x: this._tilePosition(curCol), y: this._tilePosition(curRow), num: this.array[curRow + shiftRow][curCol + shiftCol].num}, 
                                    y: this._tilePosition(curRow + shiftRow), 
                                    x: this._tilePosition(curCol + shiftCol),
                                    incr: false
                    });
                        
                        somethingMoved = true;
                    }   
                }
            }
        }

        if (somethingMoved){
            this.addNewTile();
            this.playAnimation()
        }
    }

    playAnimation(){
        var speed = 500;
        var scene = this.mainScene;
        this.nowPlaying = 0;
        for(let i = 0; i < this.fakeTiles.length; i++){
            this.fakeTilesSprits[i] = scene.add.sprite(this.fakeTiles[i].tile.x, this.fakeTiles[i].tile.y, 'tiles', 0);
            if (this.fakeTiles[i].x == -1){
                this.nowPlaying++;
                this.mainScene.tweens.add({
                    targets: this.fakeTilesSprits[i].setVisible(false),
                    delay: speed,
                    scaleX: 1,
                    scaleY: 1,
                    duration: speed,
                    onStart: function(tween, target){
                        target[0].scaleX = 0;
                        target[0].scaleY = 0;
                        target[0].visible = true;
                    },
                    onComplete: function(tween, target){
                        target[0].destroy();
                        scene.fieldManager.nowPlaying--;
                        if (scene.fieldManager.nowPlaying == 0){
                            scene.fieldManager.fakeTiles = [];
                            scene.fieldManager.fakeTilesSprits = [];
                            scene.fieldManager._reload();
                        }
                    }
                });
            }
            else{
                if (this.fakeTiles[i].incr){
                    this.nowPlaying++;
                    this.mainScene.tweens.add({
                        targets: this.fakeTilesSprits[i].setFrame(this.fakeTiles[i].tile.num - 2),
                        x: this.fakeTiles[i].x,
                        y: this.fakeTiles[i].y,
                        duration:speed,
                        onComplete: function(tween, target){
                            console.log(scene.fieldManager.fakeTiles);
                            target[0].setFrame(scene.fieldManager.fakeTiles[i].tile.num - 1);
                            scene.tweens.add({
                                targets: target[0],
                                scaleX: 1.1,
                                scaleY: 1.1,
                                yoyo: true,
                                duration: speed / 2 - 10,
                                onComplete: function(tween, target){
                                    target[0].destroy();
                                    scene.fieldManager.nowPlaying--;
                                    if (scene.fieldManager.nowPlaying == 0){
                                        scene.fieldManager.fakeTiles = [];
                                        scene.fieldManager.fakeTilesSprits = [];
                                        scene.fieldManager._reload();
                                    }
                                }
                            });
                        }
                    });
                }
                else 
                {
                    this.nowPlaying++;
                    this.mainScene.tweens.add({
                        targets: this.fakeTilesSprits[i].setFrame(this.fakeTiles[i].tile.num - 1),
                        x: this.fakeTiles[i].x,
                        y: this.fakeTiles[i].y,
                        duration: speed,
                        onComplete: function(tween, target){
                            scene.tweens.add({
                                targets: target[0],
                                scaleX: 1,
                                scaleY: 1,
                                duration: speed,
                                onComplete: function(tween, target){
                                    target[0].destroy();
                                    scene.fieldManager.nowPlaying--;
                                    if (scene.fieldManager.nowPlaying == 0){
                                        scene.fieldManager.fakeTiles = [];
                                        scene.fieldManager.fakeTilesSprits = [];
                                        scene.fieldManager._reload();
                                    }
                                }
                            });
                        }
                    });
                }
            }
        }
    }

    _fitToField(x, y) {
        return ( x>=0 && x<4 ) && ( y>=0 && y<4 );
    }

    addNewTile() {
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
        newTile.visible = false;
        this.fakeTiles.push({ tile: {x: this._tilePosition(newTileIndex.col), y: this._tilePosition(newTileIndex.row), num: 1}, y: -1, x: -1, incr:false });
    }


    _fitToField(x, y) {
        return ( x>=0 && x<4 ) && ( y>=0 && y<4 );
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
                tile.visible = false;
                this.group.add(tile);
                this.array[i][j] = {
                    sprite: tile,
                    num: 0,
                    increased: false,
                };
            }
        }
    }
}
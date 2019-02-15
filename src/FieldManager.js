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

    addNewTile () {
        let emptyTiles = [];
        for(let i = 0; i < 4; ++i){
            for(let j = 0; j < 4; ++j){
                if(!this.array[i][j].exist){
                    emptyTiles.push({
                        row: i,
                        col: j
                    })
                }
            }
        }
        let newTileIndex = Phaser.Utils.Array.GetRandom(emptyTiles);
        let newTile = this.array[newTileIndex.row][newTileIndex.col];
        newTile.exist = true;
        newTile.sprite.visible = true;
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
                //tile.alpha = 1;// TODO 0
                tile.visible = 0; // TODO 0 
                if (j == 0)
                    tile.tint = 0x00ff00;
                this.group.add(tile);
                this.array[i][j] = {
                    exist: false,
                    sprite: tile
                    //TODO
                };
            }
        }
    }
}
// Will manipulate with field. Updates it and recives all events from keys.
export default class FieldManager {

    constructor (game) {

        this.field = game.add.image(250,250,'field');
        this.array = [];
        this.group = game.add.group();

        for (let i = 0; i < 4; ++i) {

            this.array[i] = [];
            for (let j = 0; j < 4; ++j) {
                let tile = game.add.image(_tilePosition(j),_tilePosition(i), 'tile');
                tile.alpha = 0;
                tile.visible = 0;
                
                group.add(two);
                array[i][j] = {

                    num: 0
                    //TODO
                };
            }
        }
    }
    
    

    _tilePosition(pos) {
        return 10;
    }
}
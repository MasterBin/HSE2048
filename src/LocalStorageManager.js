

export const localStorageKey = {
    score: "bestScore",
    name: "playerName"
};

window.fakeStorage = {
    _data: {},
  
    setItem: function (id, val) {
        return this._data[id] = String(val);
    },
  
    getItem: function (id) {
        return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
    },
  
    removeItem: function (id) {
        return delete this._data[id];
    },
  
    clear: function () {
        return this._data = {};
    }
};

export default class LocalStorageManager {
    
    constructor () {
        var supported = this.localStorageSupported();
        this.storage = supported ? window.localStorage : window.fakeStorage;
    }

    localStorageSupported(){
        var testKey = "test";

        try {
            var storage = window.localStorage;
            this.storage.setItem(testKey, "1");
            this.storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    putToStarage(object, name){ // name должно быть из localStorageKey
        var objectJSON = JSON.stringify(object);
        this.storage.setItem(name, objectJSON);
    }

    getFromStorage(name){ // name должно быть из localStorageKey
        var objectJson = this.storage.getItem(name);
        return stateJSON ? JSON.parse(objectJson) : null;
    }
}
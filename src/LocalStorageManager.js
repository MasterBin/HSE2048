

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
            storage.setItem(testKey, "1");
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            console.log("fuck");
            return false;
        }
    }

    putToStorage(object, name){ // name должно быть из localStorageKey
        var objectJSON = JSON.stringify(object);
        this.storage.setItem(name, objectJSON);
    }

    getFromStorage(name){ // name должно быть из localStorageKey
        var objectJson = this.storage.getItem(name);
        return objectJson ? JSON.parse(objectJson) : null;
    }
}
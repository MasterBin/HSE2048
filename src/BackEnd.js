const ratingURL = window.location.href + 'rating';
const nameURL = window.location.href + 'name';

export default class BackEnd {
    constructor(mainScene) {
        this.xhrGETrating = new XMLHttpRequest();
        this.xhrGETname = new XMLHttpRequest();
        this.xhrPUT = new XMLHttpRequest();

        this.xhrGETrating.onreadystatechange = () => {
            if (this.xhrGETrating.readyState == 4) {
                if (this.xhrGETrating.status == 200) {
                    mainScene.events.emit('onRatingRecived', JSON.parse(this.xhrGETrating.responseText));
                }
                else if (this.xhrGETrating.status == 400) {
                    console.log(this.xhrGETrating.responseText);
                }
            }
        }

        this.xhrGETname.onreadystatechange = () => {
            if (this.xhrGETname.readyState == 4) {
                if (this.xhrGETname.status == 200) {
                    mainScene.events.emit('onNameRecived', this.xhrGETname.responseText);
                }
                else if (this.xhrGETname.status == 400) {
                    console.log(this.xhrGETname.responseText);
                }
            }
        }

        this.xhrPUT.onreadystatechange = () => {
            if (this.xhrPUT.readyState == 4) {
                if (this.xhrPUT.status == 200) {
                    console.log("|__ADDED_TO_RATING_TABLE__|");
                }
                else if (this.xhrPUT.status == 400) {
                    console.log(this.xhrPUT.responseText);
                }
            }
        }
    }

    sendBestScore(name, bscore, async = true) {
        if (this.xhrPUT.readyState == 0 || this.xhrPUT.readyState == 4) {
            this.xhrPUT.open('put', ratingURL, async);
            this.xhrPUT.setRequestHeader("Content-Type", "application/json");
            this.xhrPUT.send(JSON.stringify(
            { 
                name: name,
                score: bscore
            }));
        }
    }

    reciveRating(async = true) {
        if (this.xhrGETrating.readyState == 0 || this.xhrGETrating.readyState == 4) {
            this.xhrGETrating.open('get', ratingURL, async);
            this.xhrGETrating.send();
        }
    }

    reciveName(async = true) {
        if (this.xhrGETname.readyState == 0 || this.xhrGETname.readyState == 4) {
            this.xhrGETname.open('get', nameURL, async);
            this.xhrGETname.send();
        }
    }

}
const ratingURL = 'http://localhost:8000/rating';

export default class BackEnd {
    constructor(mainScene) {
        this.xhrGET = new XMLHttpRequest();
        this.xhrPUT = new XMLHttpRequest();

        this.xhrGET.onreadystatechange = () => {
            if (this.xhrGET.readyState == 3) {
                // TODO: loading
            }
            if (this.xhrGET.readyState == 4) {
                if (this.xhrGET.status == 200) {
                    //TODO
                    mainScene.events.emit('onRatingRecived', JSON.parse(this.xhrGET.responseText));
                }
                else if (this.xhrGET.status == 400) {
                    console.log(this.xhrGET.responseText);
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

    sendResult(result, async = true) {
        if (this.xhrPUT.readyState == 0) {
            this.xhrPUT.open('put', ratingURL, async);
            this.xhrPUT.setRequestHeader("Content-Type", "application/json");
            this.xhrPUT.send(JSON.stringify(result));
        }
    }

    reciveRating(async = true) {
        
        if (this.xhrGET.readyState == 0) {
            console.log("recive");
            this.xhrGET.open('get', ratingURL, async);
            this.xhrGET.send();
        }
    }

}
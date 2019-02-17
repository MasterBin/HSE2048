
export default class BackEnd {
    
    constructor () {
        this.xhr = new XMLHttpRequest();
        
        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState == 3) {
                // loading
            }
            else if (this.xhr.readyState == 4) {
                console.log(JSON.parse(this.xhr.responseText));
            }
        }

        this.xhr.open('get', 'http://localhost:8000/rating', true);
        this.xhr.send();
    }

    sendResults () {
        
    }

    reciveRaiting () {
        
    }

}
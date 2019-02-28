const express = require('express');
const fs = require('fs');
const app = express();

const ratingIndex = "/rating";
const ratingPath = "data/rating.json";
const namesIndex = "/name";
const namesPath = "data/names.json";

app.use(express.json());

//load ratingIndex.html
app.use(express.static('../'));

// Rating object
// Here we will be store all data.
var g_rating = {
    "table": [],
    "max_players": 10
};
var indexHtml;


/* 
 *  Read nicknames from file
*/
fs.readFile(namesPath, 'utf8', (err, content) => {
    if (err)
        log("Can't load " + namesPath);
    g_names = JSON.parse(content);
});

/*
 * GET NAME REQUEST
*/
app.get(namesIndex, (req, res) => {
    log("[GET NAME REQUEST] {" + req.hostname + "}");
    res.send(g_names[Math.floor(Math.random()*g_names.length)]);
});


/* 
 *  Read current raiting from file
*/
fs.readFile(ratingPath, 'utf8', (err, content) => {
    if (err)
        log("Can't load " + ratingPath);
    g_rating.table = JSON.parse(content);  
});

/* 
 *  GET RATING REQUEST
*/
app.get(ratingIndex, (req, res) => {
    log("[GET RATING REQUEST] {" + req.hostname + "}");
    res.send(JSON.stringify( g_rating.table));
});

/* 
 *  PUT RATING REQUEST
*/
app.put(ratingIndex, (req, res) => {

    if (!checkInPUT(req)) {
        res.status(400).send("Score and name are required and should be really yours!");
        log(JSON.stringify(req.body));
        return;
    }

    log("[PUT REQUEST]: " + JSON.stringify(req.body));

    const rating_obj = {
        "name": req.body.name,
        "score": req.body.score
    };

    for (let i = 0; i < g_rating.table.length; ++i)
        if (g_rating.table[i].score <= rating_obj.score) {

            g_rating.table.splice(i, 0, rating_obj);
            if (g_rating.table.length > g_rating.max_players) {
                g_rating.table.pop();
            }
            res.send("Added!\n" + JSON.stringify(g_rating.table));
            writeToDisk();
            return;
        }

    if (g_rating.table.length < g_rating.max_players) {

        g_rating.table.push(rating_obj);
        res.send("Added!\n" + JSON.stringify(g_rating.table));
        writeToDisk();
        return;
    }

    res.send("Doesn't fit!\n" + JSON.stringify(g_rating.table));
});

function writeToDisk() {
    fs.writeFile(ratingPath, JSON.stringify(g_rating.table), (err) => {
        if (err)
            log("Can't load " + ratingPath);
    });
}

/* 
 *  Check input for put request
*/
function checkInPUT(input) {
    if (!input.body)
        return false;


    let score = input.body.score && typeof (input.body.score) == 'number' &&
        input.body.score < 3932101 && input.body.score > 1 && input.body.score % 2 == 0;

    let name = input.body.name && typeof (input.body.name) == 'string' &&
        input.body.name.length > 0 && input.body.name.length <= 10;

    return score && name;
};

// Check if it's a json file
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        res.status(400).send("Try to give me a Json file!");
    }
    //next();
});

function log(str) {
    console.log("["+currentTime()+"]"+str);
}

function currentTime() {
    let date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
/// exec server
app.listen(8000, () => log("Listening on 8000"));
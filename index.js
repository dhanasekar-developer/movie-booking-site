const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded({ extended: true });

const { MongoClient } = require('mongodb');
const url = "mongodb://0.0.0.0:27017"
const database = "Users";
const Client = new MongoClient(url);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
});
app.get('/streams', function (req, res) {
    res.sendFile(__dirname + "/streams.html")
});
app.get('/bookings', function (req, res) {
    res.sendFile(__dirname + "/bookings.html")
});
app.get('/offers', function (req, res) {
    res.sendFile(__dirname + "/offers.html")
});
app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/login.html")
});
app.get('/signin', function (req, res) {
    res.sendFile(__dirname + "/signin.html")
});

const getData = async () => {
    const result = await Client.connect();
    const db = result.db(database);
    const Collections = db.collection('TamilMovies')

    const response = await Collections.find({}).toArray()
    return response;
}
app.get('/getData', function (req, res) {
    myPromise = new Promise((resolve, reject) => {
        resolve(getData())
    })
    myPromise.then((getData) => {
        res.send(getData)
    }).catch((error) => {
        res.status(500).send('error')
    })
})


app.post('/login', encoder, function (req, res) {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;

    postData(userName, email, password, repeatPassword)
    // res.send(userName+ ' ' + email + ' ' + password + ' ' + repeatPassword);

})

const postData = async (userName, email, password, repeatPassword) => {
    const result = await Client.connect();
    const dbs = result.db(database);
    const Collections = dbs.collection('User');

    Collections.insertOne({
        UserName: userName,
        Email: email,
        Password: password,
        RepeatPassword: repeatPassword,
    }).then(result => {
        console.log('Result', result)
    }).catch(error => {
        console.error('Erroe', error)
    })
}

app.listen(8080);
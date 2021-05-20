const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParserr = require('body-parser');
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'1054vvbb',
    database:'crud',
});

app.use(cors());
app.use(express.json());
app.use(bodyParserr.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie";

    db.query(sqlSelect,  (err, result) => {
       res.send(result);
    });
});

app.post('/api/insert', (req, res) => {    

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie (name, review) VALUES (?,?)";

    db.query(sqlInsert, [movieName, movieReview] , (err, result) => {
       console.log(result);
    })
});


app.delete('/api/delete/:name', (req, res) => {
    const name = req.params.movieName;

    const sqlDelete = 
    "DELETE FROM movie WHERE name = ?";

    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    })
})
    


app.listen(3001, () => {
    console.log('Run On Port 3001');
});


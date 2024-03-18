const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.HOST, 
    user: process.env.DATABASEUSERNAME, 
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if(err) console.log(err)
    console.log("Connected successfully")
});


app.get('/submissionList', async (request, response) => {
    try {
        const [results, fields] = await pool.query(
          'SELECT * FROM `userSubmissions`'
        );
      
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        response.json(results);
    } 
    catch (err) {
        console.log(err);
    }
});

app.post('/upload', async(request, response) => {
    try {
        const data = request.body;
        console.log(request.body);
        const sql = "insert into userSubmissions (userName, codeLanguage, stdin, code, result) values (?, ?, ?, ?)"
        const [rows, fields] = await pool.query(sql, [data.name, data.lang, data.stdin, data.code, data.result]);
        console.log(rows);
        console.log(fields);
        response.send("Uploaded")
    } catch (error) {
        console.log(error);
        response.send(error);
    }
});
 
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
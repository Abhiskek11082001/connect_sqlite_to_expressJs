const express = require("express");
const app = express();

const {open} = require('sqlite');

const sqlite3 = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname,"goodreads.db");


let db = null;

const initializeServer = async() => {
   try {
        db = await open({
        filename : dbPath,
        driver : sqlite3.Database,
    })
    app.listen(3000,() => {
    console.log("Server start successful")
    });

   }
   catch(e){
       console.log(`DbError  ${e}`)
       process.exit(1)
   }
}

initializeServer();


app.get('/books/', async(req,res) => {
    const getBooksQuery = `SELECT * 
                           FROM book ORDER BY book_id`;
    const booksArray = await db.all(getBooksQuery);
    res.send(booksArray);
})
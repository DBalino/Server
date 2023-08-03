import express from "express"
import mysql from "mysql"
import cors from 'cors'

const app = express ();
app.use(cors())
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "database"
});

app.post("/register", (req,res)=>{
    const username = req.body.username;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;

  if (!username || !fullname || !email || !password) {
    return res.json({ success: false });
  }


  const sql = `INSERT INTO accounts (username, fullname, email, password) VALUES (?, ?, ?, ?)`;
  db.query(sql, [username, fullname, email, password], (err, result) => {
    if (err) {
      console.error('Error during registration:', err);
      return res.json({ success: false });
    }
    return res.json({ success: true });
  });
});

app.post("/login", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const query = `SELECT * FROM database.accounts WHERE username = ? AND password = ?`;
    db.query(query, [username, password], (err, results) => {
     
    if (err) {
      console.error(err);
      res.json({ success: false });
    } else {
      if (results.length > 0) {
        res.json({ success: true });

      } else {
        res.json({ success: false });
      }
    }
});
    
    });
    var sql = "SELECT * FROM database.accounts";
        
    db.query(sql, (err, result) => {
        console.log(result);
    });

app.listen (8800, () =>{
    console.log("Server is Running...")
});
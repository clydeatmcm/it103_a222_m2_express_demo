const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// database connection string
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tasksmgr',
    port: '3307'
});

db.connect(err=>{
    if(err) throw err;
    console.log('Connected to MySQL');
});

// HTTP Get (Retrieve)

app.get('/tasks',(req, res)=>{
    // database (mysql) logic
    db.query('SELECT * FROM Task',(err, results)=>{
        if(err) return res.status(500).send(err);
        res.json(results);
    });
});

// HTTP Post (Create)
app.post('/tasks', (req, res)=>{
    // database logic INSERT stmts
    const { task_name, task_completed } = req.body;
    const query = 'INSERT INTO Task (task_name, task_completed, task_created) VALUES (?, ?, NOW())';
    db.query(query, [task_name, task_completed], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send('Task created');
    });
});

// HTTP Put (Update)

// HTTP Delete (Delete)

const PORT = 3001;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
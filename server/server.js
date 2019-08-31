const express = require('express')
const app = express();
const bodyparser = require('body-parser');
var mysql = require('mysql');

app.use(express.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'GOstats'
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("DB connection successfull")
    }else {
        console.log("DB connection failed, ERROR:" +JSON.stringify(err,undefined,2));
    }
})


app.listen(3000, ()=>console.log("EXPRESS SERVER IS RUNNING at port # 3000"));

//GET ALL STATS
app.get('/all',(req,res)=>{
    mysqlConnection.query(`SELECT * FROM stats`,(err,rows,fields)=>{
        if(!err){
            console.log(rows);
            res.send(rows);
        }else{
            console.log(err);
        }
    })
})
//DELETE STATS
app.delete('/stats/:id', (req,res)=>{
    mysqlConnection.query(`DELETE FROM stats WHERE id =?`, [req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send("Deleted Successfully");
        }else{
            console.log(err)
        }
    })
})

//INSERT stats
app.post('/stats',(req,res)=>{
    var {date, outcome, kills, deaths, assists} = req.query;
    var sql =  `INSERT INTO stats
                (date, outcome, kills, deaths, assists)
                VALUES
                (?,?,?,?,?)`
    mysqlConnection.query(sql, [date, outcome, kills, deaths, assists], function(err,data){
        if(!err){
            res.send("Post successful!")
        }else{
            console.log("Error posting", err)
        }
    })
})

//UPDATE entry
app.post('/update', (req,res,next)=>{
    const {id, date, outcome, kills, deaths, assists} = req.query;
    // console.log(req.query);
    // return res.send([date, outcome, kills, deaths, assists, id]);
    if(!id){
        res.status(400).send({
            errors:["Please make sure you supply an entry ID from table in order to modify"]
        });
    }
    if(!date){
        res.status(400).send({
            errors:["Please make sure you supply a date"]
        })
    }
    let sql = `UPDATE stats
                SET date=?, 
                    outcome=?, 
                    kills=?, 
                    deaths=?, 
                    assists=? 
                WHERE stats.id=?`;

                console.log(sql);
    let insert = [date, outcome, kills, deaths, assists, id];

    const s = mysql.format(sql, insert);

    // console.log('Formatted SQL:', s);

    // return res.send({
    //     message: 'Testing',
    //     sql: s
    // });

    mysqlConnection.query(s, function(err,data){
        if(!err){
            res.send("Post successful!")
            const output = {
                success: true,
                data: data
            }
            res.json(output);
        }else{
            console.log("Error posting", err)
        }
    })
})
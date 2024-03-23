import express from "express";
import mysql from 'mysql'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"etudiant"

})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM etudiant2";

    db.query(sql, (err, result) =>{
        if(err) return res.json({Message: "Erreur de server"});
        return res.json(result);
    })
});

app.post('/etudiant', (req, res) =>{
    const sql = "INSERT INTO etudiant2(numEt, nomEt, noteMath, notePc) VALUES(?)";
    console.log(req.body)
    const vlues = [
        req.body.numEt,
        req.body.nomEt,
        req.body.noteMath,
        req.body.notePc
    ]
    db.query(sql, [vlues], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);}
    )
})
app.get('/read/:numEt', (req, res) => {
    const sql = "SELECT * FROM etudiant2 WHERE numEt=?";
    const numEt = req.params.numEt;

    db.query(sql, [numEt], (err, result) =>{
        if(err) return res.json({Message: "Erreur de server"});
        return res.json(result);
    })
})
 app.put('/update/:numEt', (req, res) => {
    const sql = "UPDATE etudiant2 SET `numEt`=?, `nomEt`=?, `noteMath`=?, `notePc`=? WHERE numEt=?";
    const numEt= req.params.numEt;
    db.query(sql, [req.body.numEt, req.body.nomEt, req.body.noteMath, req.body.notePc, numEt], (err, result) =>{
        if(err) return res.json({Message: "Erreur de server"});
        return res.json(result);
    })
 })

app.delete('/delete/:numEt', (req, res) => {
    const sql = "DELETE FROM etudiant2 WHERE numEt= ?";
    const numEt= req.params.numEt;
    db.query(sql, [numEt], (err, result) =>{
        if(err) return res.json({Message: "Erreur de server"});
        return res.json(result);
    })
})
app.get('/donnees', (req, res) => {
    const sql = "SELECT noteMath, notePc FROM etudiant2";
    db.query(sql, (err, result) =>{
        if(err) return res.json({Message: "Erreur de server"});
        return res.json(result);
    })
})

app.listen(8081, ()=>
{
    console.log("Listening");
})
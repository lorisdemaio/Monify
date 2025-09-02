require("dotenv").config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt');
const Round = 10;

const app = express();

app.use(express.json());
app.use(cors());

// check token
function CheckToken(req, res, next) 
{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) return res.status(401).json({ error: "Token mancante" });

    jwt.verify(token, process.env.JWT_SECRET, (err, utente) => {
      if (err) return res.status(403).json({ error: "Token non valido" });
      req.utente = utente;
      next();
    });
}

// Connessione al database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Monify'
});

db.connect((err) => {
    if(err) console.log("Errore:", err);
    else console.log("Connesso connesso al database.");
});
  
// ------------------------------ /

app.get("/", (req, res) => {
    res.send("API di Monify.");
});

// REGISTER
app.post("/api/register", async (req, res) => {
    const { nome, cognome, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, Round);
    const ql = "INSERT INTO utenti(nome, cognome, email, password) VALUES(?, ?, ?, ?)";

    db.query(ql, [nome, cognome, email, hash_password], (err, ris) => {
        if(err) return res.status(500).json({ status: "err", mex: "errore register: " + err });
        else return res.status(200).json({ status: "success", mex: "Registrato con successo." });
    });
});

// LOGIN
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const ql = "SELECT * FROM utenti WHERE email = ?";

    db.query(ql, [email], async (err, ris) => {
        if(err) res.status(500).json({ status: "err", mex: "errore:" + err });
        if(ris.length === 0) return res.status(401).json({ status: "err", mex: "credenziali non valide." });
        
        const hash = ris[0].password;
        const check = await bcrypt.compare(password, hash);
 
        if(check) 
        {   
            const utente = {id: ris[0].id, nome: ris[0].nome};
            const token = jwt.sign(utente, process.env.JWT_SECRET, { expiresIn: "2h" });
           
            return res.status(200).json({ status: "success", mex: "Accesso eseguito", token });
        }
        else return res.status(401).json({ mex: "credenziali non valide." });
    });
});

// DASHBOARD
app.post("/api/dashboard", CheckToken, (req, res) => {
    const { id } = req.body;
    const ql = "SELECT utenti.saldo FROM utenti WHERE id = ?";

    db.query(ql, [id], (err, ris) => {
        if(err) return res.status(500).json({ status: "err", mex: "errore: " + err });
        else return res.status(200).json({ status: "success", saldo: ris[0].saldo });
    });
})

// ADD FUNDS
app.post("/api/addfunds", (req, res) => {
    const { importo, id } = req.body;
    const qlSaldo = "UPDATE utenti SET saldo = saldo + ? WHERE id = ?";
    const qlRadar = "INSERT INTO radar(importo, tipo, id_utente) VALUES(?, 'entrata', ?)";

    db.query(qlSaldo, [importo, id], (err, ris) => {
        if (err) return res.status(500).json({ status: "err", mex: "Errore aggiornando saldo: " + err });

        db.query(qlRadar, [importo, id], (err2, ris2) => {
            if (err2) return res.status(500).json({ status: "err", mex: "Errore inserendo radar: " + err2 });

            return res.status(200).json({ status: "success", mex: "Fondi aggiunti correttamente." });
        });
    });
});

// ADD EXPENSE
app.post("/api/addexpense", (req, res) => {
    const { titolo, importo, id } = req.body;
    const qlSaldo = "UPDATE utenti SET saldo = saldo - ? WHERE id = ?";
    const qlRadar = "INSERT INTO radar(titolo, importo, tipo, id_utente) VALUES(?, ?, 'uscita', ?)";

    db.query(qlSaldo, [importo, id], (err, ris) => {
        if (err) return res.status(500).json({ status: "err", mex: "Errore aggiornando saldo: " + err });

        db.query(qlRadar, [titolo, importo, id], (err2, ris2) => {
            if (err2) return res.status(500).json({ status: "err", mex: "Errore inserendo radar: " + err2 });

            return res.status(200).json({ status: "success", mex: "Spesa registrata correttamente." });
        });
    });
});

// ------- RADAR ------- //

// ENTRATE
app.post("/api/entrate", (req, res) => {
    const { id } = req.body;
    const ql = "SELECT * FROM radar WHERE tipo = 'entrata' AND id_utente = ?";

    db.query(ql, [id], (err, ris) => {
        if(err) return res.status(500).json({ status: "err", mex: "errore: " + err });
        else return res.status(200).json({ ris });
    });
})

// USCITE
app.post("/api/uscite", (req, res) => {
    const { id } = req.body;
    const ql = "SELECT * FROM radar WHERE tipo = 'uscita' AND id_utente = ?";

    db.query(ql, [id], (err, ris) => {
        if(err) return res.status(500).json({ status: "err", mex: "errore: " + err });
        else return res.status(200).json({ ris });
    });
})

// ------- GOALS ------- //

// CREA GOALS
app.post("/api/addgoal", (req, res) => {
    const { importo, titolo, id } = req.body;
    const ql = "INSERT INTO goals(titolo, saldo, obiettivi, id_utente) VALUES(?, '0', ?, ?)";

    db.query(ql, [titolo, importo, id], (err, ris) => {
        if(err) return res.status(500).json({ status: "err", mex: "errore: " + err });
        else return res.status(200).json({ status: "success", mex: "Obiettivo creato con successo." });
    })
})

// GOALS
app.post("/api/goals", (req, res) => {
    const { id } = req.body;
    const ql = "SELECT * FROM goals WHERE id_utente = ?";

    db.query(ql, [id], (err, ris) => {
        if(err) return res.status(404).json({ status: "err", mex: "errore: " + err });
        else return res.status(200).json({ ris });
    })
})

// INFO GOAL
app.post("/api/infogoal", (req, res) => {
    const { id, id_utente } = req.body;
    const ql = "SELECT * FROM goals WHERE id = ? AND id_utente = ?";

    db.query(ql, [id, id_utente], (err, ris) => {
        if(err) return res.status(404).json({ status: "err", mex: "errore: " + err });
        else return res.status(200).json({ ris });
    })
})

// ADD GOAL FUNDS
app.patch("/api/addgoalfunds", (req, res) => {
    const { importo, id } = req.body;
    const ql = "UPDATE goals SET saldo = saldo + ? WHERE id_utente = ?";
    const qlSaldoUtente = "UPDATE utenti SET saldo = saldo - ? WHERE id = ?";

    db.query(ql, [importo, id], (err, ris) => {
        if(err) return res.status(500).json({ status: "err", mex: "errore: " + err });

        db.query(qlSaldoUtente, [importo, id], (err2, ris2) => {
            if(err2) return res.status(500).json({ status: "err", mex: "errore: " + err2 });
            
            return res.status(200).json({ status: "success", mex: "Fondi spostati correttamente." });
        });
    });
});

// DELETE GOAL
app.post("/api/deletegoal", (req, res) => {
    const { id, id_utente } = req.body;
    const ql = "DELETE FROM goals WHERE id = ? AND id_utente = ?";

    db.query(ql, [id, id_utente], (err, ris) => {
        if(err) return res.status(404).json({ status: "err", mex: "errore: " + err });
        else return res.status(200).json({ status: "success", mex: "Obiettivo eliminato con successo." });
    })
})

// ------- ACCOUNT ------- //

// MODIFICA PASSWORD
app.patch("/api/changepassword", async (req, res) => {
    const { password, id } = req.body;
    const hash_password = await bcrypt.hash(password, Round);

    const ql = "UPDATE utenti SET password = ? WHERE id = ?"

    db.query(ql, [hash_password, id], (err, ris) => {
        if(err) return res.status(404).json({ status: "err", mex: "errore:" + err });
        else return res.status(200).json({ status: "success", mex: "Password aggiornata con successo." })
    })
})

// RESET RADAR
app.post("/api/resetradar", (req, res) => {
    const { id } = req.body;
    const ql = "DELETE FROM radar WHERE id_utente = ?";

    db.query(ql, [id], (err, ris) => {
        if(err) return res.status(404).json({ status: "err", mex: "errore: " + err });
        else return res.status(200).json({ status: "success", mex: "Radar pulito con successo." });
    })
})

// ELIMINA ACCOUNT
app.post("/api/deleteaccount", (req, res) => {
    const { id } = req.body;
    const ql = "DELETE FROM utenti WHERE id = ?";

    db.query(ql, [id], (err, ris) => {
        if(err) return res.status(404).json({ status: "err", mex: "errore: " + err });
        else return res.status(200).json({ status: "success", mex: "Account eliminato con successo." });
    })
})

// ------------------------------ /

app.listen(3030, '0.0.0.0', () => {
    console.log("Server ON.");
});
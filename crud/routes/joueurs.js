var express = require('express');
var router = express.Router();

////////////////////////////////////////////////////////////////////////////////
// GET /joueurs
////////////////////////////////////////////////////////////////////////////////
router.get('/', function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM joueur', function (err, rows) {
            if (err) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(500, { "Content-Type": "application/json" });
                var result = {
                    success: false
                }
                res.write(JSON.stringify(err));
                res.end();
            }
            else {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(200, { "Content-Type": "application/json" });
                var result = {
                    success: true,
                    rows: rows.length,
                }
                res.write(JSON.stringify(rows));
                res.end();
            }
        });
    });
});


////////////////////////////////////////////////////////////////////////////////
// POST /joueurs
////////////////////////////////////////////////////////////////////////////////
/**
 * POST | Ajout d'un joueur
 * Exemple : 
    {
      "token": "5GHJF6789",
      "nom": "jean",
      "master":1,
      "mort":2,
      "role": 1,
      "partie": "567YUIFG6789"
    }
 */
router.post('/', function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query(`
                            INSERT INTO joueur (token, nom, master, mort, role, partie) 
                            VALUES ( "${req.body.token}", "${req.body.nom}", ${req.body.master}, ${req.body.mort}, ${req.body.role}, ${req.body.partie})
                    `, function (err, rows) {
                if (err) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.writeHead(500, { "Content-Type": "application/json" });
                    var result = {
                        success: false
                    }
                    res.write(JSON.stringify(err));
                    res.end();
                }
                else {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.writeHead(201, { "Content-Type": "application/json" });
                    var result = {
                        success: true,
                        rows: rows.length,
                    }
                    res.write(JSON.stringify(req.body));
                    res.end();
                }
            });
    });
});


module.exports = router;

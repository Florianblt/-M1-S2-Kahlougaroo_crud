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
// GET /joueurs/:partie/:pseudo
////////////////////////////////////////////////////////////////////////////////
router.get('/:partie/:pseudo', function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query(
            `
            SELECT joueur.token 
            FROM joueur 
            INNER JOIN partie ON joueur.partie = partie.token
            WHERE joueur.nom = "${req.params.pseudo}"
            AND partie.pin = ${req.params.partie}
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
      "token": "TOKEN-JOUEUR-TEST",
      "nom": "jean",
      "master":1,
      "mort":0,
      "role": 1,
      "partie": "TOKEN-PARTIE-TEST"
    }
 */
router.post('/', function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query(`
                            INSERT INTO joueur (token, nom, master, mort, role, partie)
                            SELECT "${req.body.token}", "${req.body.nom}", ${req.body.master}, ${req.body.mort}, ${req.body.role}, token FROM partie WHERE partie.pin = ${req.body.partie}
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

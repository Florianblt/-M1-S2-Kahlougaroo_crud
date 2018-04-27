var express = require('express');
var router = express.Router();

////////////////////////////////////////////////////////////////////////////////
// GET /parties
////////////////////////////////////////////////////////////////////////////////
router.get('/', function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM partie', function (err, rows) {
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
// GET /parties:pin
////////////////////////////////////////////////////////////////////////////////
router.get('/:pin', function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM partie WHERE pin = ' + req.params.pin , function (err, rows) {
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
// GET /parties:token_joueur
////////////////////////////////////////////////////////////////////////////////
router.get('/byToken/:token_joueur', function (req, res) {
    req.getConnection(function (err, connection) {
                var query = connection.query('SELECT p.pin, p.nb_joueurs, p.token, p.statut  FROM partie p INNER JOIN joueur j ON p.token = j.partie WHERE j.token = "' + req.params.token_joueur + '"' 
                , function (err, rows) {            
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
                var code = 200;
                if(rows[0] == null)
                {
                    console.log("vide");
                    code = 204;
                }
                console.log(rows);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.writeHead(code, { "Content-Type": "application/json" });
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
// POST /parties
////////////////////////////////////////////////////////////////////////////////
/**
 * POST | Ajout d'une partie en base de donnée
 * Exemple : 
    {
      "token": "TOKEN-TEST",
      "pin":0,
      "nb_joueurs":8,
      "statut":1
    }
 */

router.post('/', function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query(`
                    INSERT INTO partie (token, pin, nb_joueurs, statut) 
                    VALUES ( "${req.body.token}", ${req.body.pin}, ${req.body.nb_joueurs}, ${req.body.statut})
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
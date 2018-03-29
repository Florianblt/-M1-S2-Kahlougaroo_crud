var express = require('express');
var router = express.Router();

////////////////////////////////////////////////////////////////////////////////
// GET /parties
////////////////////////////////////////////////////////////////////////////////
router.get('/', function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM partie', function (err, rows) {
            if (err) {
                // throw err;
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
        // connection.release();
    });
});



////////////////////////////////////////////////////////////////////////////////
// GET /parties:pin
////////////////////////////////////////////////////////////////////////////////
router.get('/:pin', function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM partie WHERE pin = ' + req.param.pin , function (err, rows) {
            if (err) {
                // throw err;
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
        // connection.release();
    });
});







/* SQL PARTIE
    -- PRIMARY KEY --
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- OTHER --
    token VARCHAR(250) NOT NULL UNIQUE,
    pin int(11) NOT NULL,
    nb_joueurs int(11) NOT NULL,
    statut int(11) NOT NULL
*/
////////////////////////////////////////////////////////////////////////////////
// POST /parties
////////////////////////////////////////////////////////////////////////////////
/**
 * POST | Ajout d'une partie en base de donnée
 * Exemple : 
    {
      "token": "XXL",
      "pin":2,
      "nb_joueurs":3,
      "statut":2
    }
 */

router.post('/', function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query(`
                    INSERT INTO partie (token, pin, nb_joueurs, statut) 
                    VALUES ( "${req.body.token}", ${req.body.pin}, ${req.body.nb_joueurs}, ${req.body.statut})
                    `, function (err, rows) {
            if (err) {
                 //throw err;
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
                res.write(JSON.stringify(rows));
                res.end();
            }
        });
        // connection.release();()
    });
});






module.exports = router;
var express = require('express');
var router = express.Router();

////////////////////////////////////////////////////////////////////////////////
// POST /outils/delete/parties
////////////////////////////////////////////////////////////////////////////////
router.post('/delete/parties', function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query(`
                    DELETE FROM partie
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

////////////////////////////////////////////////////////////////////////////////
// POST /outils/delete/joueurs
////////////////////////////////////////////////////////////////////////////////
router.post('/delete/joueurs', function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query(`
                    DELETE FROM joueurs
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

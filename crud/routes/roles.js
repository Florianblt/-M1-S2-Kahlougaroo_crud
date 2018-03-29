var express = require('express');
var router = express.Router();

////////////////////////////////////////////////////////////////////////////////
// GET /roles
////////////////////////////////////////////////////////////////////////////////
router.get('/', function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM role', function (err, rows) {
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


module.exports = router;
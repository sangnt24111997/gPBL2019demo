const mailservice = require('../services/mailservice');
var gdist = 0;
module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/getDistance', function(req, res){
        res.json({
            data: gdist
        });
    });

    app.get('/api', function(req, res){
        var query = req.query;
        gdist = parseFloat(query.distance);
        if(gdist < 10){mailservice(gdist);}
        res.writeHead(200, {
            'Content-type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        });
        res.write('\n');
        res.write("data: "+gdist+ "\n\n");
    });  
};
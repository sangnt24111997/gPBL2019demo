const mailservice = require('../services/mailservice');
const bin_height = 100;
var gdist = 0;
module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/getDistance', function(req, res){
        if(gdist >= bin_height){
            gdist = bin_height;
        }
        var percentage = ((1 - gdist/bin_height)*100).toFixed(2);
        res.json({
            distance: gdist,
            percentage: percentage
        });
    });

    app.get('/api', function(req, res){
        var query = req.query;
        gdist = parseFloat(query.distance);
        if(gdist >= bin_height){
            gdist = bin_height;
        }
        var percentage = ((1 - gdist/bin_height)*100).toFixed(2);
        if(gdist < 10){mailservice(percentage);}
        res.writeHead(200, {
            'Content-type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        });
        res.write('\n');
        res.write("data: "+gdist+ "\n\n");
    });  
};
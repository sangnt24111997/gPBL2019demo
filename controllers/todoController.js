const mailservice = require('../services/mailservice');
var mongoose = require('../services/dbconnect');
var Distances = require('../models/distances');

const bin_height = 15;
var gdist = bin_height;
module.exports = function(app){
    app.get('/', async (req, res, next)=>{
        Distances.find({}, null, {limit: 5, sort: {'created': -1}}, function(err, distances){
            if(err) throw err;
            else{
                res.render('index', {
                    distances:distances,
                });
            }
        });
    });

    app.get('/getDistance', function(req, res){
        Distances.find({}, null, {limit: 5, sort: {'created': -1}}, function(err, distances){
            var lsDistances = [];
            if(err) throw err;
            else{
                distances.forEach(function(distance){
                    var objDistance = {}
                    objDistance._id = distance._id;
                    objDistance.distance = parseFloat(distance.distance);
                    objDistance.created = distance.created;
                    lsDistances.push(objDistance);
                });
            }
            if(gdist >= bin_height){
                gdist = bin_height;
            }
            var percentage = ((1 - gdist/bin_height)*100).toFixed(2);
            res.json({
                distance: gdist,
                percentage: percentage,
                lsDistances: lsDistances
            });
        });
    });

    app.get('/api', function(req, res){
        var query = req.query;
        gdist = parseFloat(query.distance);
        if(gdist >= bin_height){
            gdist = bin_height;
        }
        var trash_height = bin_height - gdist
        var item = Distances({distance: trash_height}).save(function(err, data){
            if(err) throw err;
            else{
                var percentage = ((1 - gdist/bin_height)*100).toFixed(2);
                if(gdist < 10){mailservice(percentage);}
                res.writeHead(200, {
                    'Content-type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                });
                res.write('\n');
                // res.write("data: "+trash_height+ "\n\n");
                res.write("data: "+gdist+ "\n\n");
            }
        });
    });  
};
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
    });
};
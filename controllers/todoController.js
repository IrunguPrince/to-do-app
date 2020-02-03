var bodyParser = require('body-parser');

var data = [{item: 'read a book'},{item: 'listen to some music'},{item: 'get some goals'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    app.get('/todo', function(req, res){
        res.render('todo',{todos: data});
    });
    app.post('/todo', urlencodedParser, function(req, res){
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo', function(req, res){
        
    });

};
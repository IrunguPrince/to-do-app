var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

//connect to DB
mongoose.connect('mongodb+srv://prince:prince3253@cluster0-anlwk.mongodb.net/test?retryWrites=true&w=majority');

//create schema(like a blueprint)
var todoSchema  = new mongoose.Schema({
    item: String
});

//create model
var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'buy car'}).save(function(err){
    if(err) throw err;
    console.log('Item saved successfully');
});
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

    app.delete('/todo/:item', function(req, res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g,'-') !== req.params.item;
        });
        res.json(data);
    });

};
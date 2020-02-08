var bodyParser = require('body-parser');
var mongoose =  require('mongoose');

//connect to DB
mongoose.connect('mongodb+srv://prince:prince3253@cluster0-anlwk.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
//create schema(like a blueprint)
var todoSchema  = new mongoose.Schema({
    item: String
});

//create model
var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'read a book'},{item: 'listen to some music'},{item: 'get some goals'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    app.get('/todo', function(req, res){
        //get data from mongodb and pass it to the view
        Todo.find({},function(err, data){
            if(err) throw err;
            res.render('todo',{todos: data});
        }); 
    });
    app.post('/todo', urlencodedParser, function(req, res){
        //get data from view and add it to the database
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        //delete requested item from mongodb
        Todo.findOneAndRemove({item: req.params.item.replace(/\-/g, "")},function(err, data){
            if(err) throw err;
            res.json(data);
        });
           
        
       /* data = data.filter(function(todo){
            return todo.item.replace(/ /g,'-') !== req.params.item;
        });
        res.json(data);*/
    });

};
var data = [{item: 'read a book'},{item: 'listen to some music'},{item: 'get some goals'}];

module.exports = function(app){
    app.get('/todo', function(req, res){
        res.render('todo',{todos: data});
    });
    app.post('/todo', function(req, res){
        
    });

    app.delete('/todo', function(req, res){
        
    });


};
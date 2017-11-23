var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');

module.exports = function(app) {
    // session
    app.use(function(req, res, next) {
        var _user = req.session.username;
        app.locals.user = _user;
        return next();
    });

    // index
    app.get('/', Index.index);

    // movie
    app.post('/admin/movie/add', Movie.add);
    app.get('/movie/:id', Movie.detail);
    app.get('/admin/new', Movie.news);
    app.get('/admins/update/:id', Movie.update);
    app.get('/admin/list', Movie.list);
    app.delete('/admin/list/remove', Movie.del);

    // user
    app.post('/users/register', User.register);
    app.post('/users/login', User.login);
    app.get('/users/list', User.list);
    app.get('/users/del/:id', User.del);
    app.get('/users/logout', User.logout);    
}
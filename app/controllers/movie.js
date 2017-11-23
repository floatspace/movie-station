var _ = require('underscore');
var Movie = require('../models/movie');

// admin -> update | addnew
exports.add =  function(req, res) {
    var formData = JSON.stringify(req.body);
    var movieObj = JSON.parse(formData);
    var _id = movieObj._id;
    var _movie = null;
    if(_id != 'undefined') {
        Movie.findById(_id, function(err, movie) {
            if(err) {
                console.log(err);
            }
            movieObj.year = new Date(movieObj.year).getTime();
            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if(err) {
                    console.log(err);
                    return false;
                }
                console.log(movie);
                res.redirect('/movie/' + movie._id);
            });
        });
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            country: movieObj.country,
            title: movieObj.title,
            year: new Date(movieObj.year).getTime(),
            poster: movieObj.poster,
            language: movieObj.language,
            flash: movieObj.flash,
            summary: movieObj.summary
        });
        _movie.save(function(err, movie) {
            if(err) {
                console.log(err);
                return false;
            }
            res.redirect('/movie/' + movie._id);
        });
    }
};

// detail
exports.detail =  function(req, res) {
    var _id = req.params.id;
    Movie.findById(_id, function(err, movie) {
        if(err) {
            console.log(err);
            return false;
        }
        res.render('pages/detail.jade', {
            title: '详情页',
            movie:{
                doctor: movie.doctor,
                country: movie.country,
                title: movie.title,
                year: movie.year,
                poster: movie.poster,
                language: movie.language,
                flash: movie.flash,
                summary: movie.summary 
            }
        });        
    });
};

// admin > new
exports.news =  function(req, res) {
    res.render('pages/admin.jade', {
        title: '后台页',
        movie: {            
            doctor: '',
            country: '',
            title: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        }
    })
};

// admin -> update
exports.update = function(req, res) {
    var _id = req.params.id;
    if(_id) {
        Movie.findById(_id, function(err, movie) {
            if(err) {
                console.log(err);
                return false;
            }
            res.render('pages/admin.jade', {
                title: '更新电影数据',
                movie: movie
            })
        });
    }
};

// admin > list
exports.list = function(req, res) {
    Movie.fetch(function(err, movies) {
        res.render('pages/list.jade', {
            title: '列表页',
            movies: movies
        })
    });
};

// admin > removeById 方法2
exports.del = function(req, res) {
    var _id = req.query.id;
    console.log(_id);
    Movie.removeById(_id, function(err) {
        if(err) {
            console.log(err);
            return false;
        }
        res.json({
            code: 0000,
            success: true
        })
    })
};
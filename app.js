var express = require('express');
var path = require('path');
var _ = require('underscore');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var Movie = require('./models/movie');

var app = express();
var PORT = process.env.port || 3000;

app.locals.moment = require('moment');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT);
console.log('moviesite started at port: ' + PORT);

mongoose.connect('mongodb://localhost/movies',{useMongoClient: true});

// index
app.get('/', function(req, res) {
    Movie.fetch(function(err, movies) {
        res.render('pages/index.jade', {
            title: '小站主页',
            movies: movies
        })
    });
});
// temp add 
app.get('/add', function(req, res) {
    var _movie = new Movie({
        doctor: '奥里奥尔·保罗',
        title: '看不见的客人Contratiempo',
        language:'西班牙语',
        country:'西班牙',
        year: new Date('2017-09-15').getTime(),
        poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2498971355.webp',
        flash: 'http://vt1.doubanio.com/201711171435/a3f519d4465e84fb79fb40b95e20c1d0/view/movie/M/302140574.mp4',
        summary: '艾德里安（马里奥·卡萨斯 Mario Casas 饰）经营着一间科技公司，事业蒸蒸日上，家中有美丽贤惠的妻子和活泼可爱的女儿，事业家庭双丰收的他是旁人羡慕的对象。然而，野心勃勃的艾德里安并未珍惜眼前来之不易的生活，一直以来，他和一位名叫劳拉（芭芭拉·蓝妮 Bárbara Lennie 饰）的女摄影师保持着肉体关系。某日幽会过后，两人驱车离开别墅，却在路上发生了车祸，为了掩盖事件的真相，两人决定将在车祸中死去的青年丹尼尔联同他的车一起沉入湖底。之后，劳拉遇见了一位善良的老人，老人将劳拉坏掉的车拉回家中修理，然而，令劳拉没有想到的是，这位老人，竟然就是丹尼尔的父亲。'
    });

    _movie.save(function(err, movie) {
        if(err) {
            console.log(err);            
            return false;
        }
        console.log('保存成功');
        console.log(movie);
    })
});

// admin -> update | addnew
app.post('/admin/movie/new', function(req, res) {
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
});

// detail
app.get('/movie/:id', function(req, res) {
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
});

// admin
app.get('/admin', function(req, res) {
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
});

// admin -> update
app.get('/admins/update/:id', function(req, res) {
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
});

// admin > list
app.get('/admin/list', function(req, res) {
    Movie.fetch(function(err, movies) {
        res.render('pages/list.jade', {
            title: '列表页',
            movies: movies
        })
    });
});

// admin > removeById 方法1
app.get('/admin/del/:id', function(req, res) {
    var _id = req.params.id;
    Movie.removeById(_id, function(err) {
        if(err) {
            console.log(err);
            return false;
        }
        console.log('delete success');
        res.redirect('/admin/list');
    })
})
// admin > removeById 方法2
app.delete('/admin/list/remove', function(req, res) {
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
})
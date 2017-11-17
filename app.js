var express = require('express');
var path = require('path');

var app = express();
var PORT = process.env.port || 3000;

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'assets')));

app.listen(PORT);
console.log('moviesite started at port: ' + PORT);

// index
app.get('/', function(req, res) {
    res.render('pages/index.jade', {
        title: '小站主页',
        movies: [
            {
                title: '正义联盟', 
                id:'01',
                poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2504027804.webp'
            },
            {
                title: '战狼2', 
                id:'02',
                poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2494701965.jpg'
            },
            {
                title: '看不见的客人', 
                id:'03',
                poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2498971355.jpg'
            },
            {
                title: '肖申克的救赎', 
                id:'04',
                poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg'
            },
            {
                title: '千与千寻', 
                id:'05',
                poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910830216.jpg'
            },
            {
                title: '羞羞的铁拳', 
                id:'05',
                poster: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2499793218.webp'
            }
        ]
    })
});
// detail
app.get('/movie/:id', function(req, res) {
    res.render('pages/detail.jade', {
        title: '详情页',
        movie:{
            doctor: '奥里奥尔·保罗',
            country:'西班牙',
            title: '看不见的客人Contratiempo',
            year: '2017-09-15',
            poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2498971355.webp',
            language:'西班牙语',
            flash: 'http://vt1.doubanio.com/201711171435/a3f519d4465e84fb79fb40b95e20c1d0/view/movie/M/302140574.mp4',
            summary: '艾德里安（马里奥·卡萨斯 Mario Casas 饰）经营着一间科技公司，事业蒸蒸日上，家中有美丽贤惠的妻子和活泼可爱的女儿，事业家庭双丰收的他是旁人羡慕的对象。然而，野心勃勃的艾德里安并未珍惜眼前来之不易的生活，一直以来，他和一位名叫劳拉（芭芭拉·蓝妮 Bárbara Lennie 饰）的女摄影师保持着肉体关系。某日幽会过后，两人驱车离开别墅，却在路上发生了车祸，为了掩盖事件的真相，两人决定将在车祸中死去的青年丹尼尔联同他的车一起沉入湖底。之后，劳拉遇见了一位善良的老人，老人将劳拉坏掉的车拉回家中修理，然而，令劳拉没有想到的是，这位老人，竟然就是丹尼尔的父亲。'
        }
    });
});
// admin
app.get('/admin', function(req, res) {
    res.render('pages/admin.jade', {
        title: '后台页'
    })
});
// admin > list
app.get('/admin/list', function(req, res) {
    res.render('pages/list.jade', {
        title: '列表页',
         movies: [
            {
                doctor: '奥里奥尔·保罗',
                country:'西班牙',
                title: '看不见的客人Contratiempo',
                year: '2017-09-15',
                language:'西班牙语',
                flash: 'http://vt1.doubanio.com/201711171435/a3f519d4465e84fb79fb40b95e20c1d0/view/movie/M/302140574.mp4',
                summary: 'xxx'
            },
            {
                doctor: '保罗',
                country:'英国',
                title: '看不见的客人Contratiempo',
                year: '2017-09-15',
                creatTime: '2017-11-17',
                language:'英语语',
                flash: 'http://vt1.doubanio.com/201711171435/a3f519d4465e84fb79fb40b95e20c1d0/view/movie/M/302140574.mp4',
                summary: 'xxx'
            },
        ]
    })
});
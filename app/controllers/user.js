var Users = require('../models/users');

// user > register
exports.register =  function(req, res) {
    var formData = req.body;
    var _user = new Users({
        username: formData.username,
        password: formData.password
    });
    _user.save(function(err, user) {
        if(err) {
            console.log(err);
            return;
        }
        res.redirect('/admin/userlist');
    });
};

// user > login
exports.login =  function(req, res) {
    var formData = req.body;
    var _username = formData.username;
    var _password = formData.password;
    Users.findByName(_username, function(err, user) {
        if(err) {
            console.log(err);
            return;
        }
        if(!user) {
            console.log('用户不存在');
            res.redirect('/');
            return;
        }

        user.comparePassword(_password, function (err, isMatch) {
            if (isMatch) {
                console.log('用户登录成功');
                req.session.username = _username;
                return res.redirect('/');
            } else {
                console.log('密码错误');                
                return res.redirect('/');
            }
        });
    })
};

// user > list
exports.list = function(req, res) {
    Users.fetch(function(err, users) {
        if(err) {
            console.log(err);
            return;
        }
        res.render('pages/userlist', {
            title: '用户列表',
            users: users
        })
    });
};

// user > del
exports.del =  function(req, res) {
    var _id = req.params.id;
    Users.removeById(_id, function(err) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('删除成功');
        res.redirect('/admin/userlist');
    })
};

// user > logout
exports.logout = function(req, res) {
    delete req.session.username;
    res.redirect('/');
};
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

UserSchema.pre('save', function(next) {
    var self = this;
    // 密码加密(加盐算法)
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('salt:' + salt);
        bcrypt.hash(self.password, salt, null, function(err, hash) {
            if(err){
                console.log(err);
                return;
            }
            self.password = hash;
            if(self.isNew) {
                self.meta.createAt = self.meta.updateAt = Date.now(); 
            } else {
                self.meta.updateAt = Date.now();
            }
            next();
        });
    });
});

UserSchema.methods = {
    comparePassword: function (_password, cb) {
        bcrypt.compare(_password, this.password, function (err, isMatch) {
            if(err) return cb(err);
            cb(null, isMatch);
        })
    }
};

UserSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findByName: function(username, cb) {
        return this
            .findOne({username: username})
            .exec(cb);
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    },
    removeById: function(id, cb) {
        return this
            .remove({_id: id})
            .exec(cb)
    }
};
module.exports = UserSchema;
const Configstore = require('configstore');
const conf = new Configstore("ATMexample");

module.exports = {
    read:read,
    write:write,
    remove:remove,
    clear: clear
};

function create(id,pin,cb){
    conf.set(`user.${id}.${pin}`,0);
    cb(1, 0);
}

function read(id,pin, cb){
    var amount = conf.get(`user.${id}.${pin}`);
    cb(1, amount);
}

function write(id,pin, amount, cb){
    conf.set(`user.${id}.${pin}`, amount);
    cb(1, amount);
}

function remove(id,pin, cb){
    conf.delete(`user.${id}.${pin}`);
    cb(1, 0);
}

function clear(cb){
    conf.clear();
    if(cb)
        cb();
}
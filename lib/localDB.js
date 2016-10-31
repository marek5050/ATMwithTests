const Configstore = require('configstore');
const conf = new Configstore("ATMexample");

module.exports = {
    read:read,
    write:write,
    remove:remove,
    clear: clear
};

function read(id, cb){
    var amount = conf.get("user."+id);
    cb(1, amount);
}

function write(id, amount, cb){
    conf.set("user."+id, amount);
    cb(1, amount);
}

function remove(id, cb){
    conf.delete("user."+ id);
    cb(1, 0);
}
function clear(cb){
    conf.clear();
    if(cb)
        cb();
}
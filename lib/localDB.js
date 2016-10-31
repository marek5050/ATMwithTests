const Configstore = require('configstore');
//
// // create a Configstore instance with an unique ID e.g.
// // package name and optionally some default values
const conf = new Configstore("ATMexample");
//
// console.log(conf.get('foo'));
// //=> 'bar'
//
// conf.set('awesome', true);
// console.log(conf.get('awesome'));
// //=> true
//
// // use dot-notation to access nested properties
// conf.set('bar.baz', true);
// console.log(conf.get('bar'));
// //=> {baz: true}
//
// conf.delete('awesome');
// console.log(conf.get('awesome'));
// //=> undefined


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
/**
 * Created by marek5050 on 10/31/16.
 */
var localDB = require("./localDB.js");
var googleDB = require("./googleDB.js");

module.exports = function(){
    var self = this;
    self.name = "AMT";
    self.currency = "USD";
    self.amount   = 0;
    self.database = localDB;
    self.checkBalance = function(){ database.read(id,pin,result); };
    self.deposit  = deposit ;
    self.withdraw = withdraw;
    self.clear = (cb) => { self.currency = "USD"; self.amount = 0; self.database.clear(cb); }



    function update(id,pin, amount, callback) {
        self.amount += amount;

        database.read(id, pin, function (result, currentAmount){
            if(result == 1){
                if(currentAmount == undefined || currentAmount == NaN){
                    currentAmount = 0;
                }

                currentAmount += amount;
                database.write(id,pin, currentAmount, callback);
            }else{
                callback(result, "There was a problem retrieving the account. ");
            }
        });
    }
    function withdraw (id,pin,amount, result){
            update(id,pin,-amount, result);
    }

    function deposit (id,pin, amount, result){
            update(id,pin, amount, result);
    }

    return self;
}();

module.exports.googleDB = googleDB;
module.exports.localDB = localDB;

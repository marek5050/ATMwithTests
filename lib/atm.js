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
    self.checkBalance = (id,result) => { database.read(id,result); };
    self.deposit  = deposit ;
    self.withdraw = withdraw;
    self.clear = (cb) => { self.currency = "USD"; self.amount = 0; self.database.clear(cb); }



    function update(id,amount, callback) {
        self.amount += amount;

        database.read(id, function (result, currentAmount){
            if(result == 1){
                if(currentAmount == undefined || currentAmount == NaN){
                    currentAmount = 0;
                }

                currentAmount += amount;
                database.write(id, currentAmount, callback);
            }else{
                callback(result, "There was a problem retrieving the account. ");
            }
        });
    }
    function withdraw (id,amount, result){
            update(id,-amount, result);
    }

    function deposit (id,amount, result){
            update(id, amount, result);
    }

    return self;
}();

module.exports.googleDB = googleDB;
module.exports.localDB = localDB;

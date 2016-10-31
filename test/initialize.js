var atm = require('./../lib/atm.js');
var chai = require('chai');
var assert = chai.assert;

var live = process.env.LIVE || 0;

describe('ATMexample', function () {
    before(function(){
       if(live == 1){
           atm.database = atm.googleDB;
       }
    });
    describe('.deposit()', function () {
        before(function(done){
            atm.clear(done);
        });

        context('deposit $100 for a user <1>', function (done) {
            it('the user <1>  should be able to deposit $100', function (done) {
                atm.deposit(1, 100, function(status, amount){
                    if(status!=1 )
                        done(status);
                    else done();
                });
            });

            it('the atm should have a balance of $100', function(done){
                chai.assert(atm.amount, 100);
                done();
            })
        });

        context('deposit $200 for a user <2>', function (done) {
            it('the user <2>  should be able to deposit $200', function (done) {
                atm.deposit(2, 200, function(status, amount){
                    if(status!=1 )
                        done(status);
                    else done();
                });
            });

            it('the atm should have a balance of $200', function(done){
                assert.equal(atm.amount, 300);
                done();
            })
        });
    });



describe(".checkBalance()", function(){
    it("user <1> balance should show $100", function(done){
        atm.checkBalance(1,function(status,amount){
            if(status!=1)
                done(status);
            else {
                assert.equal(amount, 100);
                done();
            }
        });
    });

    it("user <2> balance should show $200", function(done){
        atm.checkBalance(2,function(status,amount){
            if(status!=1)
                done(status);
            else {
                assert.equal(amount, 200);
                done();
            }
        });
    });
});










    describe('.withdraw()', function () {
        before(function(){});

        context('withdraw $100 for a user <1>', function (done) {
            it('the user <1>  should be able to withdraw $100', function (done) {
                atm.withdraw(1, 100, function(status, amount){
                    if(status!=1 )
                        done(status);
                    else done();
                });
            });

            it("the user's balance should show $0", function(done){
                atm.checkBalance(1,function(status,amount){
                    if(status!=1)
                        done(status);
                    else {
                        assert.equal(amount, 0);
                        done();
                    }
                });
            });

            it('the atm should have a balance of $200', function(){
                chai.assert(atm.amount, 200);
            })
        });

        context('withdraw $100 for a user <2>', function (done) {
            it('the user <2>  should be able to withdraw $100', function (done) {
                atm.withdraw(2, 100, function(status, amount){
                    if(status!=1 )
                        done(status);
                    else done();
                });
            });

            it("the user's balance should show $100", function(done){
                atm.checkBalance(2,function(status,amount){
                    if(status!=1)
                        done(status);
                    else {
                        chai.assert(amount, 100);
                        done();
                    }
                });
            });

            it('the atm should have a balance of $200', function(){
                chai.assert(atm.amount, 300);
            })
        });
    });
});

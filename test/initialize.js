var atm = require('./../lib/atm.js');
var chai = require('chai');
var assert = chai.assert;
var should = require('chai').should();

var live = process.env.LIVE || 0;

describe('ATMexample', function () {
    before(function(){
       if(live == 1){
           atm.database = atm.googleDB;
       }
    });
    describe('.create()', function (){
        before(function(done){
            atm.clear(done);
        });
         it(' create user <1> with pin <1500> ', function (done) {
                atm.create(1, 1500, function (status, amount) {
                    if (status != 1)
                        done(status);
                    else {
                        assert.equal(amount, 0);
                        done();
                    }
                });
        });

        it('the user should have an initial balance of $0 ', function (done) {
            atm.checkBalance(1,1500, function(status,amount){
                assert.equal(amount,0);
                done();
            })
        });
        it('an invalid pin should fail ', function (done) {
            atm.checkBalance(1,2500, function(status,amount){
                // 1 == success

                status.should.not.equal(1);

                done();
            })
        });
    });

    describe('.deposit()', function () {
        context('deposit $100 for a user <1>', function (done) {
            it('the user <1>  should be able to deposit $100', function (done) {
                atm.deposit(1,1500, 100, function(status, amount){
                    if(status!=1 )
                        done(status);
                    else {
                        assert.equal(amount,100);
                        done();
                    }
                });
            });

            it('the atm should have a balance of $100', function(done){
                assert.equal(atm.amount, 100);
                done();
            })
        });

        context('deposit $200 for a user <2>', function (done) {
            it('the user <2>  should be able to deposit $200', function (done) {
                atm.deposit(2,2500, 200, function(status, amount){
                    if(status!=1 )
                        done(status);
                    else{
                        assert.equal(amount,200);
                        done();
                    }
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
            atm.checkBalance(1, 1500 ,function(status,amount){
                if(status!=1)
                    done(status);
                else {
                    assert.equal(amount, 100);
                    done();
                }
            });
        });

        it("user <2> balance should show $200", function(done){
            atm.checkBalance(2,2500, function(status,amount){
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
                atm.withdraw(1, 1500, 100, function(status, amount){
                    if(status!=1 )
                        done(status);
                    else done();
                });
            });

            it("the user's balance should show $0", function(done){
                atm.checkBalance(1,1500,function(status,amount){
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
                atm.withdraw(2, 1500, 100, function(status, amount){
                    if(status!=1 )
                        done(status);
                    else done();
                });
            });

            it("the user's balance should show $100", function(done){
                atm.checkBalance(2,2500, function(status,amount){
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

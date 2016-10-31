# ATM Example with Unit tests [![Build Status](https://travis-ci.org/marek5050/ATMwithTests.svg?branch=master)](https://travis-ci.org/marek5050/ATMwithTests)

There are two modes - Live and local.  
Local mode can be tested using  

```
$ mocha

> ATMexample
     .deposit()
       deposit $100 for a user <1>
         ✓ the user <1>  should be able to deposit $100
         ✓ the atm should have a balance of $100
       deposit $200 for a user <2>
         ✓ the user <2>  should be able to deposit $200
         ✓ the atm should have a balance of $200
     .checkBalance()
       ✓ user <1> balance should show $100
       ✓ user <2> balance should show $200
     .withdraw()
       withdraw $100 for a user <1>
         ✓ the user <1>  should be able to withdraw $100
         ✓ the user's balance should show $0
         ✓ the atm should have a balance of $200
       withdraw $100 for a user <2>
         ✓ the user <2>  should be able to withdraw $100
         ✓ the user's balance should show $100
         ✓ the atm should have a balance of $200
 12 passing (18ms)
```

Live mode testing  

```
$ LIVE=1 mocha -t 4000

> ATMexample
    .deposit()
      deposit $100 for a user <1>
        ✓ the user <1>  should be able to deposit $100 (1670ms)
        ✓ the atm should have a balance of $100
      deposit $200 for a user <2>
        ✓ the user <2>  should be able to deposit $200 (2019ms)
        ✓ the atm should have a balance of $200
    .checkBalance()
      ✓ user <1> balance should show $100 (1043ms)
      ✓ user <2> balance should show $200 (530ms)
    .withdraw()
      withdraw $100 for a user <1>
        ✓ the user <1>  should be able to withdraw $100 (1352ms)
        ✓ the user's balance should show $0 (472ms)
        ✓ the atm should have a balance of $200
      withdraw $100 for a user <2>
        ✓ the user <2>  should be able to withdraw $100 (1600ms)
        ✓ the user's balance should show $100 (552ms)
        ✓ the atm should have a balance of $200
  
  12 passing (10s)
```

### API 
-l  optional live mode connected to the Google Spreadsheet   

atm [-l] create \<user id> \<pin>   
atm [-l] deposit \<user id> \<pin> \<amount>   
atm [-l] withdraw \<user id> \<pin> \<amount>  
atm [-l] checkBalance \<user id> \<pin>   
atm [-l] clear   

#### Sample run
 
```
$ ./app.js -l clear
 The database has been cleared. 
 
$ ./app.js clear
 The database has been cleared.
  
$ ./app.js -l create 5 1910
 Created user 5 with pin: 1910. 0
 
$ ./app.js -l checkBalance 5 1910
 User 5 has a balanced of 0
 
$ ./app.js -l deposit 5 1911 200
There was a problem retrieving the account. Invalid pin

$ ./app.js -l deposit 5 1910 500
 User 5 has deposited 500 and has a balance of 500
 
$ ./app.js -l checkBalance 5 1910
 User 5 has a balanced of 500
 
$ ./app.js -l checkBalance 5 1911
Invalid pin

```
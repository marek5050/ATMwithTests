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

atm [-l] deposit \<user id> \<amount>   
atm [-l] withdraw \<user id> \<amount>  
atm [-l] checkBalance \<user id> 
atm [-l] clear 

#### Example
 
```
$ ./app.js -l clear
 The database has been cleared. 
 
$ ./app.js clear
 The database has been cleared.
  
$ ./app.js deposit 1 100
 User 1 has deposited 100 and has a balance of 100
 
$ ./app.js -l deposit 1 200
 User 1 has deposited 200 and has a balance of 200
 
$ ./app.js -l checkBalance 1 
 User 1 has a balanced of 200
 
$ ./app.js -l deposit 1 200
 User 1 has deposited 200 and has a balance of 400
 
$ ./app.js -l checkBalance 1 
 User 1 has a balanced of 400
 
$ ./app.js checkBalance 1 
 User 1 has a balanced of 100

```
# ATM Example with Unit tests [![Build Status](https://travis-ci.org/marek5050/ATMwithTests.svg?branch=master)](https://travis-ci.org/marek5050/ATMwithTests)

There are two modes - Live and local.  
Local mode can be tested using  

```
mocha 
```

Live mode testing  

```
LIVE=1 mocha -t 4000
```

### API 
-l  options live parameters   

atm [-l] deposit <user id> <amount>   
atm [-l] withdraw <user id> <amount>   
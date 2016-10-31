#! /usr/local/bin/node
/**
 * Created by marek5050 on 10/30/16.
 */
var atm = require("./lib/atm.js");
var program = require('commander');
var chalk = require('chalk');


program
    .version('0.0.1')
    .usage('[options] command')
    .option('-l, --live', 'Use Google Spreadsheets');

var str = "";

program
    .command('deposit <id> <amount>')
    .action(function (id, amount) {
        if(program.live){
            atm.database = atm.googleDB;
        }
        str=` User ${id} has deposited ${amount} and has a balance of `;
        atm.deposit(Number(id),Number(amount),response);
    });

program
    .command('withdraw <id> <amount>')
    .action(function (id, amount) {
        if(program.live){
            atm.database = atm.googleDB;
        }
        str = ` User ${id} has withdrawn ${amount} and has a balance of `;
        atm.withdraw(id,amount,response);
    });

program
    .command('checkBalance <id>')
    .action(function (id, amount) {
        if(program.live){
            atm.database = atm.googleDB;
        }
        str = ` User ${id} has a balanced of `;
        atm.checkBalance(id, response);
    });

program
    .command('clear')
    .action(function (id, amount) {
        if(program.live){
            atm.database = atm.googleDB;
        }
        str = ` The database has been cleared. `;
        atm.clear(function(){
            response(1,"");
        });
    });

function response(status, information){
    if(status===1){
        console.log(str + chalk.green(information));
    }else{
        console.log(str + chalk.red(information));
    }
}
program.parse(process.argv);
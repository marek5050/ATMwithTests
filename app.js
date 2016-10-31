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


program
    .version('0.0.1')
    .command('deposit <id> <amount>')
    .action(function (id, amount) {
        if(program.live){
            atm.database = atm.googleDB;
        }

        console.log(id,amount,response);
    });

program
    .version('0.0.1')
    .command('withdraw <id> <amount>')
    .action(function (id, amount) {
        if(program.online){
            atm.database = atm.googleDB;
        }

        console.log(id,amount,response);
    });

function response(status, information){
    if(status===1){
        console.log(chalk.green(information));
    }else{
        console.log(chalk.red(information));
    }
}

program.parse(process.argv);
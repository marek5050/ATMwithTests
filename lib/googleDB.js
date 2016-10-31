var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1XMRWL-t35-fcdDgiBRuP5ATdb2iRjhvoXZ4ri7q2kIg');
var sheet;

module.exports = {
    read: read,
    write: write,
    remove: remove,
    clear: clear,
    create: create,
};
function create(id,pin, cb){
    async.series([
        function setAuth(step){
            var creds = require('./../config/google-generated-creds.json');
            doc.useServiceAccountAuth(creds, step);
        },
        function getInfoAndWorksheets(step) {
            doc.getInfo(function(err, info) {
                // console.log('Loaded doc: '+info.title+' by '+info.author.email);
                sheet = info.worksheets[0];
                // console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
                step();
            })
        },function workingWithCells(step) {
            sheet.getCells({
                'min-row': id,
                'max-row': id,
                'max-col': 2,
                'return-empty': true
            }, function(err, cells) {
                cells[0].value = pin;
                cells[1].value = 0.0;
                sheet.bulkUpdateCells(cells, function(){
                    cb(1, 0.0);
                    step();
                })
            });
        }])
}

function read(id,pin, cb){
    async.series([
        function setAuth(step) {
            var creds = require('./../config/google-generated-creds.json');
            doc.useServiceAccountAuth(creds, step);
        },
        function getInfoAndWorksheets(step) {
            doc.getInfo(function(err, info) {

                sheet = info.worksheets[0];
                step();
            });
        },
        function workingWithCells(step) {
            sheet.getCells({
                'min-row': id,
                'max-row': id,
                'max-col': 2,
                'return-empty': true
            }, function(err, cells) {
                var _pin = cells[0].value;
                var _balance = cells[1].numericValue;

                if(_pin == pin){
                    cb(1, _balance || 0.0);
                }else{
                    cb(0, "Invalid pin");
                }
                step();
            });
        }])
}

function write(id,pin, amount, cb){
    async.series([
        function setAuth(step) {
            var creds = require('./../config/google-generated-creds.json');
            doc.useServiceAccountAuth(creds, step);
        }, function getInfoAndWorksheets(step) {
            doc.getInfo(function(err, info) {
                sheet = info.worksheets[0];
                step();
            });
        },
        function workingWithCells(step) {
            sheet.getCells({
                'min-row': id,
                'max-row': id,
                'max-col': 2,
                'return-empty': true
            }, function(err, cells) {
                var _pin = cells[0].value;
                var cell = cells[1];

                if(_pin == pin){
                    cell.setValue(amount,
                        function(){
                            cb(1, amount);
                            step();
                        })
                }else{
                    cb(0, "Invalid pin");
                }
            });
        }])
}

function remove(id,pin, cb){
    async.series([
        function setAuth(step) {
            // see notes below for authentication instructions!
            var creds = require('./../config/google-generated-creds.json');
            // OR, if you cannot save the file locally (like on heroku)
            doc.useServiceAccountAuth(creds, step);
        }, function getInfoAndWorksheets(step) {
            doc.getInfo(function(err, info) {
                // console.log('Loaded doc: '+info.title+' by '+info.author.email);
                sheet = info.worksheets[0];
                // console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
                step();
            });
        },
        function workingWithCells(step) {
            sheet.getCells({
                'min-row': id,
                'max-row': id,
                'max-col': 2,
                'return-empty': true
            }, function(err, cells) {
                var cell = cells[0];
                cell.setValue(0,
                    function(){
                        cb(1, cell.value);
                        step();
                    });
        })}])
}

function clear(cb){
    async.series([
        function setAuth(step) {
            // see notes below for authentication instructions!
            var creds = require('./../config/google-generated-creds.json');
            // OR, if you cannot save the file locally (like on heroku)
            doc.useServiceAccountAuth(creds, step);
        },
        function getInfoAndWorksheets(step) {
            doc.getInfo(function(err, info) {
                // console.log('Loaded doc: '+info.title+' by '+info.author.email);
                sheet = info.worksheets[0];
                step();
            });
        }, function clearSheet(step){
            sheet.getCells({
                'min-row': 1,
                'max-row': 10,
                'return-empty': true
            }, function(err, cells){
                for(idx in cells ){
                    cells[idx].value = 0.0;
                }
                sheet.bulkUpdateCells(cells, function(){ step(); });
            })
        }, function _cb(){
            if(cb)
                cb();
        }
])
}
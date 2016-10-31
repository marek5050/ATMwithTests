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
};

function read(id, cb){
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
                // sheet.resize({rowCount: 99, colCount: 1},step);
                // console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
                step();
            });
        },
        function workingWithCells(step) {
            sheet.getCells({
                'min-row': id,
                'max-row': id,
                'max-col': 1,
                'return-empty': true
            }, function(err, cells) {
                var cell = cells[0];
                // console.log('Cell R'+cell.row+'C'+cell.col+' = '+cells.value);
                cb(1, cell.numericValue || 0.0);
                step();
            });
        }])
}

function write(id, amount, cb){
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
                'max-col': 1,
                'return-empty': true
            }, function(err, cells) {
                var cell = cells[0];
                // console.log('Cell R'+cell.row+'C'+cell.col+' = '+cells.value);

                // cell.value = cell.numericValue + amount;
                cell.setValue(amount,
                    function(){
                        cb(1, amount);
                        step();
                    }
                ); //async

            });
        }])
}

function remove(id, cb){
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
                'max-col': 1,
                'return-empty': true
            }, function(err, cells) {
                var cell = cells[0];
                // console.log('Cell R'+cell.row+'C'+cell.col+' = '+cells.value);

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
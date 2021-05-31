const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const moment = require('moment');
const fs = require('fs');

var dbPath = path.join('../../database', "data.sqlite");
var dbStatus = {
    isReady: false,
    isInited: false,
    isFreezing: false,
    processes: 0};

exports.dbPath = dbPath;
exports.status = dbStatus;

var db = null;

function init(isDev = false) {
    if (!fs.existsSync(path.dirname(exports.dbPath)))
        fs.mkdirSync(path.dirname(exports.dbPath))
    dbStatus.isDev = isDev;
    dbStatus.isReady = false;
    dbStatus.isFreezing = true;
    db = new sqlite3.Database(dbPath, (err) => {
        if(err) {
            if(isDev) {
                console.error(moment().format(), ':', "Error occurs when creating database");
                console.error(err);
            }
            console.error(moment().format(), ':', "Program forced exit due to fatal errors!");
            process.exit();
        }
        db.run("create table if not exists userstatus(\
            username TEXT UNIQUE ON CONFLICT FAIL PRIMARY KEY NOT NULL ON CONFLICT FAIL, \
            status INT)", (err) => {
            if(err) {
                if(isDev) {
                    console.error(moment().format(), ':', "Error occurs when creating database");
                    console.error(err);
                }
                console.error(moment().format(), ':', "Program forced exit due to fatal errors!");
                process.exit();
            }
            db.run("create table if not exists collections(\
                title TEXT, \
                url TEXT, \
                author TEXT, \
                journal TEXT, \
                volume TEXT, \
                year TEXT, \
                onlineID NUMERIC, \
                offlinePath TEXT)", (err) => {
                if(err) {
                    if(isDev) {
                        console.error(moment().format(), ':', "Error occurs when creating database");
                        console.error(err);
                    }
                    console.error(moment().format(), ':', "Program forced exit due to fatal errors!");
                    process.exit();
                }
                db.run("create table if not exists comments(\
                    ID INT UNIQUE ON CONFLICT FAIL PRIMARY KEY NOT NULL ON CONFLICT FAIL, \
                    time INT, \
                    text TEXT)", (err) => {
                    if(err) {
                        if(isDev) {
                            console.error(moment().format(), ':', "Error occurs when creating database");
                            console.error(err);
                        }
                        console.error(moment().format(), ':', "Program forced exit due to fatal errors!");
                        process.exit();
                    }
                    exports.close = db.close;
                    dbStatus.isReady = true;
                    dbStatus.isInited = true;
                    dbStatus.isFreezing = false;
                });
            });
        });
    });

    function selectAll(table, callback) {
        db.all("SELECT * from " + table, (err, rows) => {
            if(isDev) callback(err, rows);
            else {
                if(err) callback(err.code, []);
                else callback(null, rows);
            }
        });
    }

    function getData(table, conditions = null, keys, callback) {
        var payload = "SELECT (";
        for (i in keys) {
            payload += keys[i] + ',';
        }
        payload = payload.slice(0, payload.length - 1) + ") FROM " + table;
        if (conditions) {
            payload += " WHERE (";
            for (each in conditions) {
                if (typeof(conditions[each]) != "string") payload += each + " = " + conditions[each].toString() + ",";
                else payload += each + " = '" + conditions[each] + "',";
            }
            payload = payload.slice(0, payload.length - 1) + ")";
        }
        db.all(payload, (err, row) => {
            if(isDev) callback(err, row);
            else {
                if(err) callback(err.code, []);
                else callback(null,row);
            }
        });
    }

    function insertData(table, data, callback) {
        dbStatus.isReady = false;
        ++dbStatus.processes;
        var payload = "INSERT INTO " + table + "(";
        var valuelist = [];
        for (each in data) {
            payload += each + ',';
            valuelist.push(data[each]);
        }
        payload = payload.slice(0, payload.length - 1) + ") VALUES (";
        for (each in data) {
            payload += "?,";
        }
        payload = payload.slice(0, payload.length - 1) + ")";
        db.run(payload, valuelist, (err) => {
            --dbStatus.processes;
            if(!dbStatus.processes) dbStatus.isReady = true;
            if(isDev) callback(err);
            else {
                if(err) callback(err.code);
                else callback(null);
            }
        })
    }

    function changeData(table, conditions, data, callback) {
        dbStatus.isReady = false;
        ++dbStatus.processes;
        var payload = "UPDATE " + table + " SET ";
        for (each in data) {
            if (typeof(data[each]) != "string") payload += each + " = " + data[each].toString() + ",";
            else payload += each + " = '" + data[each] + "',";
        }
        payload = payload.slice(0, payload.length - 1) + " WHERE (";
        for (each in conditions) {
            if (typeof(conditions[each]) != "string") payload += each + " = " + conditions[each].toString() + ",";
            else payload += each + " = '" + conditions[each] + "',";
        }
        payload = payload.slice(0, payload.length - 1) + ")";
        db.run(payload, (err) => {
            --dbStatus.processes;
            if(!dbStatus.processes) dbStatus.isReady = true;
            if(isDev) callback(err);
            else {
                if(err) callback(err.code);
                else callback(null);
            }
        })
    }

    function deleteData(table, conditions, callback) {
        dbStatus.isReady = false;
        ++dbStatus.processes;
        var payload = "DELETE FROM " + table + " WHERE (";
        for (each in conditions) {
            if (typeof(conditions[each]) != "string") payload += each + " = " + conditions[each].toString() + ",";
            else payload += each + " = '" + conditions[each] + "',";
        }
        payload = payload.slice(0, payload.length - 1) + ")";
        db.run(payload, (err) => {
            --dbStatus.processes;
            if(!dbStatus.processes) dbStatus.isReady = true
            if(isDev) callback(err);
            else {
                if(err) callback(err.code);
                else callback(null);
            }
        })
    }

    exports.userstatus = {
        all: (callback) => {selectAll('userstatus', callback);},
        get: (username, callback) => {getData('userstatus', {username: username}, ['status'], callback);},
        insert: (userstatus, callback) => {insertData('userstatus', userstatus, callback);},
        change: (userstatus, callback) => {changeData('userstatus', {username: userstatus.username}, {status: userstatus.status}, callback);},
        delete: (username, callback) => {deleteData('userstatus', {username:username}, callback);}
    };

    exports.collections = {
        all: (callback) => {selectAll('collections', callback);},
        get: (conditions, keys, callback) => {getData('collections', conditions, keys, callback);},
        insert: (data, callback) => {insertData('collections', data, callback);},
        change: (conditions, data, callback) => {changeData('collections', conditions, data, callback);},
        delete: (conditions, callback) => {deleteData('collections', conditions, callback);}
    };

    exports.comments = {
        all: (callback) => {selectAll('comments', callback);},
        get: (conditions, keys, callback) => {getData('comments', conditions, keys, callback);},
        insert: (data, callback) => {insertData('comments', data, callback);},
        change: (conditions, data, callback) => {changeData('comments', conditions, data, callback);},
        delete: (conditions, callback) => {deleteData('comments', conditions, callback);}
    };
};

exports.init = init;

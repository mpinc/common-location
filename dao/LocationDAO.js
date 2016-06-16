/**
 * Created by Szane on 2016/3/24.
 */
var mongoDb = require('../db/MongoCon.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('LocationDAO.js');
var config = require('../config/SystemConfig.js');
var commonUtil = require('mp-common-util');
var resUtil = commonUtil.responseUtil;
var sysMsg = commonUtil.systemMsg;
var http = require('http');

function addLocation(params, callback) {
    var location = {
        userId: params.userId,
        updateTime: params.updateTime,
        deviceType: params.deviceType,//设备类型：0:win-pc;1:mac;2:android;3:ios;9:others
        deviceToken: params.deviceToken,
        latitude: params.latitude,//纬度
        longitude: params.longitude//经度
    };
    mongoDb.getDb(function (error, db) {
        if (error) {
            callback(error, null);
        }
        db.collection("location_collection").insertOne(location, function (error, record) {
            callback(error, record);
        });
    });
}
function getLocation(params, callback) {
    var queryObj = {};
    if (params.userId != null) {
        queryObj["userId"] = params.userId;
    }
    if (params.startTime != null && params.endTime != null) {
        queryObj ["updateTime"] = {$gt: 'ISODate("params.startTime")', $lt: 'ISODate("params.endTime")'};
    }
    if (params.deviceType != null) {
        queryObj["deviceType"] = params.deviceType;
    }
    mongoDb.getDb(function (error, db) {
        if (error) {
            callback(error, null);
        }
        db.collection('location_collection').find(queryObj).sort({updateTime: -1}).toArray(function (error, result) {
            callback(error, result);
        });
    });
}
function getUserIdByDriverId(params, callback) {
    var url = "http://" + config.loginModuleUrl.host + ":" + config.loginModuleUrl.port + "/api/driver?driverId=" + params.driverId;
    http.get(url, function (result) {
        var data = "";
        result.on('data', function (d) {
            data += d;
        }).on('end', function () {
            var driver = eval("(" + data + ")");
            if (driver) {
                callback(driver.user_id);
            } else
                callback(null);
        }).on('error', function (e) {
            callback(e);
        });
    });
}
module.exports = {
    addLocation: addLocation,
    getLocation: getLocation,
    getUserIdByDriverId: getUserIdByDriverId
};
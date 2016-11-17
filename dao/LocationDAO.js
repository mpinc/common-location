/**
 * Created by Szane on 2016/3/24.
 */
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('LocationDAO.js');
var location = require('./schema/LocationsCollection.js').Location;
var mongoose = require('../db/MongoCon.js').getMongo();
var locationModel = mongoose.model('location_collection', location);
var config = require('../config/SystemConfig.js');
var http = require('http');

function addLocation(params, callback) {
    var locationObj = new locationModel({
        userId: params.userNo,
        truckNum: params.truckNum,
        updateTime: Date.now(),
        deviceType: params.deviceType,//设备类型：0:win-pc;1:mac;2:android;3:ios;9:others
        deviceToken: params.deviceToken,
        latitude: params.latitude,//纬度
        longitude: params.longitude//经度
    });
    locationObj.save(function (error, result) {
        logger.debug('addLocation');
        callback(error, result);
    });
}
function getLocation(params, callback) {
    var query = locationModel.find({}).select('_id userId truckNum deviceType deviceToken latitude longitude updateTime ');
    if (params.userNo != null) {
        query.where('userId').equals(params.userNo);
    }
    if (params.truckNum != null) {
        query.where('truckNum').equals(params.truckNum);
    }
    if (params.startTime != null) {
        query.where('updateTime').gte(params.startTime);
    }
    if (params.endTime != null) {
        query.where('updateTime').lte(params.endTime);
    }
    if (params.deviceType != null) {
        query.where('deviceType').equals(params.deviceType);
    }
    if (params.start && params.size) {
        query.skip(parseInt(params.start)).limit(parseInt(params.size));
    }
    query.sort('-updateTime').exec(function (err, rows) {
        logger.debug(' getLocation ');
        callback(err, rows);
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
            if (driver && driver.result && driver.result.length > 0) {
                callback(driver.result[0].user_id);
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
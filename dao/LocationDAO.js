/**
 * Created by Szane on 2016/3/24.
 */
var mongoDb = require('../db/MongoCon.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('LocationDAO.js');
var commonUtil = require('mp-common-util');
var resUtil = commonUtil.responseUtil;
var sysMsg = commonUtil.systemMsg;

function addLocation(params, callback) {
    var location = {
        userId: params.userId,
        updateTime: params.updateTime,
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
function queryAdminUser(params, callback) {
    var queryObj = {
        userName: params.userName
    };
    mongoDb.getDb(function (error, db) {
        if (error) {
            callback(error, null);
        }
        var cursor = db.collection("user_collection").find(queryObj);
        cursor.each(function (err, doc) {
            console.dir(doc);
            callback(error, doc);
        });
    });
}
function getLocation(params, callback) {
    var queryObj = {};
    if (params.userId != null) {
        queryObj["userId"] = params.userId;
    }
    if (params.startTime != null && params.endTime != null) {
        queryObj ["updateTime"] = {$gt: params.startTime + "", $lt: params.endTime + ""};
    }
    mongoDb.getDb(function (error, db) {
        if (error) {
            callback(error, null);
        }
        var cursor = db.collection('location_collection').find(queryObj).sort({updateTime: -1}).batchSize(1);
        cursor.each(function (err, doc) {
            console.dir(doc);
            callback(error, doc);
        });
    });
}
function updateLocationByUserId(params, callback) {
    var queryObj = {
        userId: params.userId
    };
    var newObj = {
        $set: {
            updateTime: params.updateTime,
            latitude: params.latitude,//纬度
            longitude: params.longitude//经度
        }
    };
    mongoDb.getDb(function (error, db) {
        if (error) {
            callback(error, null);
        }
        db.collection("location_collection").updateMany(queryObj, newObj, function (error, record) {
            callback(error, record);
        });
    });
}
function deleteLocationByUserId(params, callback) {
    mongoDb.getDb(function (error, db) {
        if (error) {
            callback(error, null);
        }
        db.collection("location_collection").deleteMany({userId: params.userId}, function (error, record) {
            callback(error, record);
        });
    });
}

module.exports = {
    addLocation: addLocation,
    queryAdminUser: queryAdminUser,
    getLocation: getLocation,
    updateLocationByUserId: updateLocationByUserId,
    deleteLocationByUserId: deleteLocationByUserId
};
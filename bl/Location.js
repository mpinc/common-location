/**
 * Created by Szane on 2016/3/24.
 */
var commonUtil = require('mp-common-util');
var resUtil = commonUtil.responseUtil;
var oAuthUtil = commonUtil.oAuthUtil;
var Seq = require('seq');
var validation = require('../util/Validation.js');
var locationDao = require('../dao/LocationDAO.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('server.js');
var systemError = require('../util/SystemError.js');


function addLocation(req, res, next) {
    var params = req.params;
    logger.debug('addLocation');
    Seq(params.locArr).seqEach(function (item, i) {
        var iterator = this;
        locationDao.getLocation({
            truckNum: item.truckNum,
            itemId: item.itemId
        }, function (error, result) {
            if (error) {
                logger.error('addLocation' + error.message);
                resUtil.resInternalError(error, res, next);
            }
            locationDao.addLocation({
                updateTime: new Date(),
                userId: item.userNo,
                truckNum: item.truckNum,
                deviceType: item.deviceType,
                deviceToken: item.deviceToken,
                longitude: item.longitude,
                latitude: item.latitude,
                itemId: item.itemId,
                speed: item.speed,
                adcode: item.adcode,
                accuracy: item.accuracy,
                locationType: item.locationType,
                distance: item.distance
            }, function (error, record) {
                if (error) {
                    logger.error('addLocation' + error.message);
                    resUtil.resInternalError(error, res, next);
                } else {
                    iterator(null, i);
                }
            });
        });
    }).seq(function () {
        res.send(200, {success: true});
        return next();
    });
}
function getRouteLocation(req, res, next) {
    var params = req.params;
    var driverUserId;
    Seq().seq(function () {
        var that = this;
        locationDao.getUserIdByDriverId(params, function (rows) {
            if (rows) {
                driverUserId = rows;
            }
            that();
        });
    }).seq(function () {
        locationDao.getLocation({
            userId: driverUserId,
            deviceType: params.deviceType,
            startTime: params.startTime,
            endTime: params.endTime,
            truckNum: params.truckNum,
            itemId: params.itemId,
            start: params.start,
            size: params.size
        }, function (error, rows) {
            if (error) {
                logger.error('getRouteLocation' + error.message);
                resUtil.resInternalError(error, res, next);
            } else if (rows) {
                var result = [];
                if (rows.length > 18) {
                    var count = rows.length - 2 - (rows.length - 2) % 16;
                    var size = count / 16;
                    for (var i = 0; i <= count; i += size) {
                        result.push(rows[i]);
                    }
                    result.push(rows[rows.length - 1]);
                } else
                    result = rows;
                resUtil.resetQueryRes(res, result);
                return next();
            } else {
                resUtil.resetQueryRes(res, []);
                return next();
            }
        });
    });
}
function getLocation(req, res, next) {
    var params = req.params;
    var driverUserId;
    Seq().seq(function () {
        var that = this;
        locationDao.getUserIdByDriverId(params, function (rows) {
            if (rows) {
                driverUserId = rows;
            }
            that();
        });
    }).seq(function () {
        locationDao.getLocation({
            userId: driverUserId,
            deviceType: params.deviceType,
            startTime: params.startTime,
            endTime: params.endTime,
            truckNum: params.truckNum,
            itemId: params.itemId,
            start: params.start,
            size: params.size
        }, function (error, rows) {
            if (error) {
                logger.error('getLocation' + error.message);
                resUtil.resInternalError(error, res, next);
            } else {
                resUtil.resetQueryRes(res, rows);
                return next();
            }
        });
    });
}

module.exports = {
    addLocation: addLocation,
    getLocation: getLocation,
    getRouteLocation: getRouteLocation
};
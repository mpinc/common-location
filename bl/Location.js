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
    if (params.latitude == null) {
        resUtil.resetFailedRes(res, systemError.INPUT_LATITUDE_ERROR);
        return next();
    }
    if (params.longitude == null) {
        resUtil.resetFailedRes(res, systemError.INPUT_LONGITUDE_ERROR);
        return next();
    }
    Seq(params.locArr).seqEach(function (item, i) {
        var iterator = this;
        locationDao.addLocation({
            updateTime: new Date(),
            userId: item.userNo,
            truckNum: item.truckNum,
            deviceType: item.deviceType,
            deviceToken: item.deviceToken,
            longitude: item.longitude,
            latitude: item.latitude
        }, function (error, record) {
            if (error) {
                logger.error('addLocation' + error.message);
                resUtil.resInternalError(error, res, next);
            } else {
                iterator(null, i);
            }
        });
    }).seq(function () {
        res.send(200, {success: true});
        return next();
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
    getLocation: getLocation
};
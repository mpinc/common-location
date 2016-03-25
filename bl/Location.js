/**
 * Created by Szane on 2016/3/24.
 */
var commonUtil = require('mp-common-util');
var resUtil = commonUtil.responseUtil;
var Seq = require('seq');
var locationDao = require('../dao/LocationDAO.js');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('server.js');

function addLocation(req, res, next) {
    var params = req.params;
    if (params.userId == null) {
        resUtil.resetFailedRes(res, "parameter is not match");
        return next();
    }
    // Seq().seq(function () {
    locationDao.addLocation(params, function (error, record) {
        if (error) {
            logger.error('addLocation' + error.message);
            resUtil.resInternalError(error, res, next);
        } else {
            resUtil.resetCreateRes(res, record);
            return next();
        }
    });
    // });
}
function getLocationByUserId(req, res, next) {
    var params = req.params;
    if (params.userId == null) {
        resUtil.resetFailedRes(res, "userId is null");
        return next();
    }
    locationDao.getLocationByUserId(params, function (error, rows) {
        if (error) {
            logger.error('getLocationByUserId' + error.message);
            resUtil.resInternalError(error, res, next);
        } else {
            resUtil.resetCreateRes(res, rows);
            console.log(rows.toString);
            return next();
        }
    });
}
function updateLocationByUserId(req, res, next) {
    var params = req.params;
    if (params.userId == null) {
        resUtil.resetFailedRes(res, "userId is null");
        return next();
    }
    locationDao.updateLocationByUserId(params, function (error, record) {
        if (error) {
            logger.error('updateLocationByUserId' + error.message);
            resUtil.resInternalError(error, res, next);
        } else {
            resUtil.resetCreateRes(res, record);
            console.log(record.toString);
            return next();
        }
    });

}
function deleteLocationByUserId(req, res, next) {
    var params = req.params;
    if (params.userId == null) {
        resUtil.resetFailedRes(res, "userId is null");
        return next();
    }
    locationDao.deleteLocationByUserId(params, function (error, record) {
        if (error) {
            logger.error('deleteLocationByUserId' + error.message);
            resUtil.resInternalError(error, res, next);
        } else {
            resUtil.resetCreateRes(res, record);
            console.log(record.toString);
            return next();
        }
    });
}

module.exports = {
    addLocation: addLocation,
    getLocationByUserId: getLocationByUserId,
    updateLocationByUserId: updateLocationByUserId,
    deleteLocationByUserId: deleteLocationByUserId
};
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
    if (params.latitude == null || !validation.isLocationNumber(params.latitude)) {
        resUtil.resetFailedRes(res, systemError.INPUT_LATITUDE_ERROR);
        return next();
    }
    if (params.longitude == null || !validation.isLocationNumber(params.longitude)) {
        resUtil.resetFailedRes(res, systemError.INPUT_LONGITUDE_ERROR);
        return next();
    }
    var subParams = {
        updateTime: new Date(),
        userId: params.userId,
        deviceType: params.deviceType,
        deviceToken: params.deviceToken,
        longitude: params.longitude,
        latitude: params.latitude
    };
    locationDao.addLocation(subParams, function (error, record) {
        if (error) {
            logger.error('addLocation' + error.message);
            resUtil.resInternalError(error, res, next);
        } else {
            res.send(200, {success: true});
            return next();
        }
    });
}

function getLocation(req, res, next) {
    var params = req.params;
    locationDao.getLocation(params, function (error, rows) {
        if (error) {
            logger.error('getLocation' + error.message);
            resUtil.resInternalError(error, res, next);
        } else {
            resUtil.resetQueryRes(res, rows);
            return next();
        }
    });
}

module.exports = {
    addLocation: addLocation,
    getLocation: getLocation
};
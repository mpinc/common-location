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
            res.send(200, {success: true});
            return next();
        }
    });
    // });
}

function adminUserLogin(req, res, next) {
    var params = req.params;
    locationDao.queryAdminUser(params, function (error, rows) {
        if (error) {
            logger.error('adminUserLogin ' + error.message);
            resUtil.resInternalError(error, res, next);
        } else {
            if (rows && rows.length < 1) {
                logger.warn('adminUserLogin ' + params.username + 'user is unregistered');
                res.send(200, {success: false});
                return next();
            }
            var passwordMd5 = commonUtil.encrypt.encryptByMd5(params.password);
            if (passwordMd5 != rows.password) {
                logger.warn(' adminUserLogin ' + params.userName + ' password error');
                res.send(200, {success: false});
                return next();
            } else {
                var user = {
                    userId: rows.id,
                    userStatus: 1
                };
                user.accessToken = commonUtil.oAuthUtil.createAccessToken(commonUtil.oAuthUtil.clientType.admin, user.userId, user.userStatus);
                logger.info(' adminUserLogin ' + params.userName + " success");
                res.send(200, user);
                return next();
            }
        }
    })

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
            res.send(200, {success: true});
            console.dir(rows);
            return next();
        }
    });
}
function getLocationByTimeRange(req, res, next) {
    var params = req.params;
    if (params.startTime == null || params.endTime == null) {
        resUtil.resetFailedRes(res, "parameter is null");
        return next();
    }
    locationDao.getLocationByTimeRange(params, function (error, rows) {
        if (error) {
            logger.error('getLocationByTimeRange' + error.message);
            resUtil.resInternalError(error, res, next);
        } else {
            res.send(200, {success: true});
            console.dir(rows);
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
            res.send(200, {success: true});
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
            res.send(200, {success: true});
            console.log(record.toString);
            return next();
        }
    });
}

module.exports = {
    addLocation: addLocation,
    adminUserLogin: adminUserLogin,
    getLocationByUserId: getLocationByUserId,
    getLocationByTimeRange: getLocationByTimeRange,
    updateLocationByUserId: updateLocationByUserId,
    deleteLocationByUserId: deleteLocationByUserId
};
/**
 * Created by Szane on 17/11/2.
 */

var commonUtil = require('mp-common-util');
var resUtil = commonUtil.responseUtil;
var trackDAO = require('../dao/ZhiyunTrackDAO');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('server.js');

exports.addTrack = function (req, res, next) {
    var params = req.params;
    trackDAO.addTrack(params, function (error, result) {
        if (error) {
            logger.error('addLocation' + error.message);
            return resUtil.resInternalError(error, res, next);
        }
        res.send(200, {success: true});
        return next();
    })
};
exports.getTrack = function (req, res, next) {
    var params = req.params;
    trackDAO.getTrack(params, function (error, result) {
        if (error) {
            logger.error('getLocation' + error.message);
            return resUtil.resInternalError(error, res, next);
        }
        resUtil.resetQueryRes(res, rows);
        return next();
    });
};
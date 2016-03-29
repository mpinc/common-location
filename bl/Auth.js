/**
 * Created by Szane on 2016/3/29.
 */
var commonUtil = require('mp-common-util');
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('server.js');

function checkAdminToken(req, next) {
    var tokenInfo = commonUtil.oAuthUtil.parseAccessToken(req);
    if (tokenInfo != null) {
        return next();
    } else {
        logger.error(req.url + " \t " + "token error");
    }
}
module.exports = {
    checkAdminToken: checkAdminToken
};
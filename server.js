/**
 * Created by ling xue on 2016/3/3.
 */


var restify = require('restify');
var commonUtil = require('mp-common-util');
var oAuthUtil = commonUtil.oAuthUtil;
var moduleUtil = commonUtil.ModuleUtil;
var serverLogger = require('./util/ServerLogger.js');
var logger = serverLogger.createLogger('server.js');
var sysConfig = require('./config/SystemConfig.js');
var location = require('./bl/Location.js');
moduleUtil.setLoginUrl(sysConfig.loginModuleUrl);

function createServer(options) {
    var server = restify.createServer({
        name: 'mp-location',
        version: '1.0.0'
    });

    // Clean up sloppy paths like
    server.pre(restify.pre.sanitizePath());

    // Handles annoying user agents (curl)
    server.pre(restify.pre.userAgentConnection());

    // Allow 5 requests/second by IP, and burst to 10
    server.use(restify.throttle({
        burst: 100,
        rate: 50,
        ip: true
    }));
    server.use(restify.bodyParser({uploadDir: __dirname + '/./uploads/'}));
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.dateParser());
    server.use(restify.authorizationParser());
    server.use(restify.queryParser());
    server.use(restify.gzipResponse());

    server.get('/', function (req, res, next) {
        res.send(200, {success: true, project: "MP Common Location Module"});
        return next();
    });
    server.post({path: '/api/location', contentType: 'application/json'}, location.addLocation);
    server.put({
        path: '/api/location/:userId/update',
        contentType: 'application/json'
    }, location.updateLocationByUserId);
    server.get('/api/location/:userId/find', location.getLocationByUserId);
    server.del('/api/location/:userId/remove', location.deleteLocationByUserId);

    server.on('NotFound', function (req, res, next) {
        logger.warn(req.url + " not found");
        res.send(404);
        next();
    });

    return (server);
}

module.exports = {
    createServer: createServer
};
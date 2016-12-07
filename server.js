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
var roleBase = require('./bl/RoleBase.js');
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
    restify.CORS.ALLOW_HEADERS.push('Access-Control-Allow-Origin');
    server.use(restify.CORS());
    // Allow 5 requests/second by IP, and burst to 10
    server.use(restify.throttle({
        burst: 100,
        rate: 50,
        ip: true
    }));
    restify.CORS.ALLOW_HEADERS.push('auth-token');
    restify.CORS.ALLOW_HEADERS.push('client-id');
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Origin");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Credentials");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods", "GET");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods", "POST");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods", "PUT");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Methods", "DELETE");
    restify.CORS.ALLOW_HEADERS.push("Access-Control-Allow-Headers", "accept,api-version, content-length, content-md5,x-requested-with,content-type, date, request-id, response-time");
    server.use(restify.CORS({headers: ['auth-token'], origins: ['*']}));
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.dateParser());
    server.use(restify.authorizationParser());
    server.use(restify.queryParser());
    server.use(restify.gzipResponse());
    server.use(restify.fullResponse());
    server.use(restify.bodyParser({uploadDir: __dirname + '/uploads/'}));
    server.get(/\/apidoc\/?.*/, restify.serveStatic({
        directory: './public'
    }));
    server.get('/', function (req, res, next) {
        res.send(200, {success: true, project: "MP Common Location Module"});
        return next();
    });
    var orderOpArr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 99];//订单操作
    server.post({
        path: '/api/location',
        contentType: 'application/json'
    }, roleBase.checkUserToken([8]), location.addLocation);
    server.get('/api/user/:userNo/location', roleBase.checkUserToken(orderOpArr), location.getLocation);

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
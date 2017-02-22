var mysqlConnectOptions = {
    user: 'mg',
    password: 'missiongreen',
    database: 'mg',
    host: '127.0.0.1',
    charset: 'utf8mb4'
    //,dateStrings : 'DATETIME'
};

var logLevel = 'DEBUG';
var loggerConfig = {
    level: 'error',
    config: {
        appenders: [
            {type: 'console'},
            {
                "type": "file",
                "filename": "../dist/public/apidocs/common-location.log",
                "maxLogSize": 204800,
                "backups": 1
            }
        ]
    }
}
function getMysqlConnectOptions() {
    return mysqlConnectOptions;
}

var rabbitUrl = 'amqp://127.0.0.1';

var mongoConfig = {
    connect: 'mongodb://123.57.11.150:27017/sinotrans'
}


var loginModuleUrl = {host: "127.0.0.1", port: 8091};

module.exports = {
    getMysqlConnectOptions: getMysqlConnectOptions,
    loggerConfig: loggerConfig,
    logLevel: logLevel,
    rabbitUrl: rabbitUrl,
    mongoConfig: mongoConfig,
    loginModuleUrl: loginModuleUrl
}

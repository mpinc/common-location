
var mysqlConnectOptions ={
    user: 'mg',
    password: 'missiongreen',
    database:'mg',
    host: '127.0.0.1' ,
    charset : 'utf8mb4'
    //,dateStrings : 'DATETIME'
};

var logLevel = 'DEBUG';
var loggerConfig = {
    appenders: [
        { type: 'console' },
        {
            "type": "file",
            "filename": "../common-payment.log",
            "maxLogSize": 2048000,
            "backups": 10
        }
    ]
}
function getMysqlConnectOptions (){
    return mysqlConnectOptions;
}

var rabbitUrl = 'amqp://127.0.0.1' ;

var mongoConfig = {
    connect : 'mongodb://127.0.0.1:27017/mg'
}


var loginModuleUrl = {host:"127.0.0.1",port:8080};

module.exports = {
    getMysqlConnectOptions : getMysqlConnectOptions,
    loggerConfig : loggerConfig,
    logLevel : logLevel ,
    rabbitUrl : rabbitUrl ,
    mongoConfig : mongoConfig ,
    loginModuleUrl : loginModuleUrl
}

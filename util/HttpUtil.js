/**
 * Created by ling xue on 2016/3/17.
 */

var http = require('http');
var qs = require('querystring');
var passwordUtil = require('../util/PasswordUtil.js');
var Base64 = passwordUtil.Base64;
var b = new Base64();
var headerTokenMeta = "auth-token";

function httpGet(host, url, req, params, callback) {
    /*console.log(url);
    http.get(url,function(result){
        var data = "";
        result.on('data', function(d) {
            data += d;
        }).on('end',function(){
            var resObj = eval("(" + data + ")");
            callback(null,resObj);
        });

    }).on('error', function(e) {
        callback(e,null);
    })*/
    if (params != null) {
        url = url + "?" + qs.stringify(params);
    }
    httpRequest(host, url, req, {}, callback, 'get');
}

function httpRequest(host, url, req, params, callback, method) {
    var paramStr = JSON.stringify(params);
    var options = {
        host: host.host,
        port: host.port,
        path: url,
        method: method != null ? method : 'post',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(paramStr, 'utf8')
        }
    }
    if (req.headers && req.headers[headerTokenMeta]) {
        options.headers[headerTokenMeta] = req.headers[headerTokenMeta];
    }
    try {
        var req = http.request(options, function (res) {
            var data = "";
            res.on('data', function (d) {
                data += d;
            });
            res.on('end', function () {
                var resObj = eval("(" + data + ")");
                if (resObj.backInfo != null) {
                    var backStr = b.decode(resObj.backInfo);
                    resObj = Object.assign(resObj, JSON.parse(backStr));
                }
                callback(null, resObj);
            });
        });
        req.write(paramStr);
        req.end();
        req.on('error', function (e) {
            callback(e, null);
        });
    } catch (e) {
        console.log(e);
    }

}

function httpPost(host, url, req, params, callback) {
    httpRequest(host, url, req, params, callback, 'post');
}

function httpPut(host, url, req, params, callback) {
    httpRequest(host, url, req, params, callback, 'put');
}

function httpDelete(host, url, req, params, callback) {
    httpRequest(host, url, req, params, callback, 'delete');
}

module.exports = {
    httpGet: httpGet,
    httpPost: httpPost,
    httpPut: httpPut,
    httpDelete: httpDelete
}
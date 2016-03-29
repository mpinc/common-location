/**
 * Created by ling xue on 2016/3/24.
 */
var request= require('supertest');
var restify = require('restify');
var client = restify.createJsonClient({
    version: '*',
    url: 'http://127.0.0.1:8088',
    headers:{"auth-token":"W251bGwsbnVsbCwxNDU5MjU1MDMzNzk5LDEsIiJd"}

});

var locationTest = require('./Location.test.js').test(client);
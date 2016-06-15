/**
 * Created by ling xue on 2016/3/24.
 */
var request = require('supertest');
var restify = require('restify');
var client = restify.createJsonClient({
    version: '*',
    url: 'http://127.0.0.1:8095',
    headers: {"auth-token": "WyIyNjEyMyIsInVzZXIiLDE0NTk5MzE2MDA3OTMsbnVsbCwiIl0="}//userId:26123,clientType:user

});
require('./Location.test.js').test(client);
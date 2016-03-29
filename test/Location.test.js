/**
 * Created by ling xue on 2016/3/24.
 */

var assert = require("assert");

exports.test = function (client) {
    describe('service: index', function () {
        // it('insert test', function (done) {
        //     var obj = {
        //         userId: '26123',
        //         updateTime: new Date(),
        //         longitude: 22.11,
        //         latitude: 123.11
        //     };
        //     client.post('/api/location', obj, function (err, req, res) {
        //         if (err) {
        //             throw new Error(err);
        //         }
        //         else {
        //             console.dir(res.statusCode);
        //             console.dir(res.body);
        //             assert(res.body.success == true);
        //             done();
        //         }
        //     });
        // });
        // it('login test', function (done) {
        //     client.get('/api/user/admin/123456', function (err, req, res) {
        //         if (err) {
        //             throw new Error(err);
        //         }
        //         else {
        //             console.dir(res.statusCode);
        //             console.dir(res.body);
        //             assert(res.body.success == true);
        //             done();
        //         }
        //     });
        // });
        it('select test', function (done) {
            client.get('/api/location/26123', function (err, req, res) {
                if (err) {
                    throw new Error(err);
                }
                else {
                    console.dir(res.statusCode);
                    console.dir(res.body);
                    assert(res.body.success == true);
                    done();
                }
            });
        });
        // it('time range select test', function (done) {
        //     client.get('/api/location/2016-03-01/2016-03-28', function (err, req, res) {
        //         if (err) {
        //             throw new Error(err);
        //         } else {
        //             console.dir(res.statusCode);
        //             console.dir(res.body);
        //             assert(res.body.success == true);
        //             done();
        //         }
        //     });
        // });
        // it('update test', function (done) {
        //     var newObj = {
        //         updateTime: new Date(),
        //         longitude: 66,
        //         latitude: 66
        //     };
        //
        //     client.patch('/api/location/26123', newObj, function (err, req, res) {
        //         if (err) {
        //             throw new Error(err);
        //         }
        //         else {
        //             console.dir(res.statusCode);
        //             console.dir(res.body);
        //             assert(res.body.success == true);
        //             done();
        //         }
        //     });
        // });
        // it('delete test', function (done) {
        //     client.del('/api/location/26123', function (err, req, res) {
        //         if (err) {
        //             throw new Error(err);
        //         }
        //         else {
        //             console.dir(res.statusCode);
        //             console.dir(res.body);
        //             assert(res.body.success == true);
        //             done();
        //         }
        //     });
        // });
    });
};
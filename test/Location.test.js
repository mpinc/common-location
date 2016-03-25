/**
 * Created by ling xue on 2016/3/24.
 */

var assert = require("assert");

exports.test = function (client) {
    describe('service: index', function () {
        it('should get a json data', function (done) {
            var obj = {
                userId: '26123',
                updateTime: new Date(),
                longitude: 22.11,
                latitude: 123.11
            };
            var newObj = {
                updateTime: new Date(),
                longitude: 0,
                latitude: 0
            }
            // client.post('/api/location', obj, function (err, req, res, data) {
            //     if (err) {
            //         throw new Error(err);
            //     }
            //     else {
            //         assert(data.success, "get index json success");
            //         console.log(data);
            //         done();
            //     }
            // });
            client.get('/api/location/26123/find', function (err, req, res, data) {
                if (err) {
                    throw new Error(err);
                }
                else {
                    console.log(data);
                    assert(data.success, "get index json success");
                    done();
                }
            });
            // client.put('/api/location/26123/update', newObj, function (err, req, res, data) {
            //     if (err) {
            //         throw new Error(err);
            //     }
            //     else {
            //         console.log(data);
            //         assert(data.success, "get index json success");
            //         done();
            //     }
            // });
            // client.del('/api/location/26123/remove', function (err, req, res, data) {
            //     if (err) {
            //         throw new Error(err);
            //     }
            //     else {
            //         console.log(data);
            //         assert(data.success, "get index json success");
            //         done();
            //     }
            // });
        });
    });
};
/**
 * Created by ling xue on 2016/3/24.
 */

var assert = require("assert");

exports.test = function (client) {
    describe('service: index', function () {
        it('insert test', function (done) {
            var obj = {
                userId: '26',
                deviceType: 0,
                longitude: 22.11,
                latitude: 123.11
            };
            client.post('/api/location', obj, function (err, req, res) {
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
        it('select test', function (done) {
            client.get('/api/location?userId=26123', function (err, req, res) {
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
    });
};
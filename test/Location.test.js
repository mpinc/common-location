/**
 * Created by ling xue on 2016/3/24.
 */

var assert = require("assert");

exports.test = function (client) {
    describe('service: index', function () {
        it('should get a json data', function (done) {

            client.get('/',  function (err, req, res, data) {
                if (err) {
                    throw new Error(err);
                }
                else {

                    assert(data.success , "get index json succss");
                    console.log(data);
                    done();
                }
            });
        });
    });
}
/**
 * Created by Szane on 2016/4/6.
 */
function isLocationNumber(locNum) {
    var reg = /^\d+\.\d+$/;
    return reg.test(locNum);
}
module.exports = {
    isLocationNumber: isLocationNumber
};
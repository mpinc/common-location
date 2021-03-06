/**
 * Created by Szane on 16/11/14.
 */
var mongoose = require('../../db/MongoCon.js').getMongo();
//var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Location = new Schema({
    userId: Number,
    truckNum: String,
    deviceType: Number,
    deviceToken: String,
    longitude: Number,
    latitude: Number,
    updateTime: Date,
    itemId: String,
    speed: Number,
    adcode: String,
    accuracy: Number,//精度
    locationType: Number,
    distance: Number
});
module.exports = {
    Location: Location
};
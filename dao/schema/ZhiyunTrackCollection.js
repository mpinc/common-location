/**
 * Created by Szane on 17/11/2.
 */
var mongoose = require('../../db/MongoCon.js').getMongo();
//var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

exports.ZhiyunTrack = new Schema({
    userId: Number,
    truckNum: String,
    createTime: Date,
    itemId: String,
    track: Object,
    park: Object,
    parkMins: String,
    startTime: Date,
    endTime: Date
});
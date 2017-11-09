/**
 * Created by Szane on 17/11/2.
 */
var serverLogger = require('../util/ServerLogger.js');
var logger = serverLogger.createLogger('ZhiYunTrackDAO.js');
var track = require('./schema/ZhiyunTrackCollection').ZhiyunTrack;
var mongoose = require('../db/MongoCon.js').getMongo();
var trackModel = mongoose.model('track_collection', track);
var config = require('../config/SystemConfig.js');

exports.addTrack = function (params, callback) {
    var trackObj = new trackModel({
        userId: params.userNo,
        truckNum: params.truckNum,
        itemId: params.itemId,
        track: params.track,
        park: params.park,
        startTime: params.startTime,
        endTime: params.endTime,
        createTime: Date.now()
    });
    trackObj.save(function (error, result) {
        logger.debug('addTrack');
        callback(error, result);
    });
};

exports.getTrack = function (params, callback) {
    var query = trackModel.find({});
    if (params.userNo != null) {
        query.where('userId').equals(params.userNo);
    }
    if (params.truckNum != null) {
        query.where('truckNum').equals(params.truckNum);
    }
    if (params.itemId != null) {
        query.where('itemId').equals(params.itemId);
    }
    if (params.startTime != null) {
        query.where('startTime').equals(params.startTime);
    }
    if (params.endTime != null) {
        query.where('endTime').equals(params.endTime);
    }
    query.sort('-createTime').exec(function (err, rows) {
        logger.debug(' getTrack ');
        callback(err, rows);
    });
};


/**
 * Created by xueling on 16/5/25.
 */
var commonUtil  = require('mp-common-util');
var sysMsg = commonUtil.systemMsg;
var sysConfig = require('../config/SystemConfig.js');
var listOfValue = require('../util/ListOfValue.js');
var oAuthUtil = commonUtil.oAuthUtil;
var httpUtil = commonUtil.httpUtil;
var resUtil = commonUtil.responseUtil;
var Seq = require('seq');
function checkRolBase(req,res,next){
    var params = oAuthUtil.getReqParams(req);
    httpUtil.httpPost(sysConfig.loginModuleUrl,'/api/roleBase',req,params,function(error,result){
        if(error || result.code){
            resUtil.resNoAuthorizedError(error,res,next);
        }else{
           return next();
        }
    })
}
var reqTokenObj ={
    headers:{
        'auth-token' : null
    }
};
function refreshToken(callback){


    httpUtil.httpGet(sysConfig.loginModuleUrl,'/api/mch/'+listOfValue.moduleInfo.mch+"/token",reqTokenObj,params,function(error,result){
        callback(error,result);
    })
}

function createToken(callback){
    httpUtil.httpPost(sysConfig.loginModuleUrl,'/api/mch/',reqTokenObj,listOfValue.moduleInfo,function(error,result){
        callback(error,result);
    })
}

function getReqWithToken(callback){
    if(reqTokenObj.headers[oAuthUtil.headerTokenMeta] == null){
        //create token
        createToken(function(error,result){
            if(error){
                logger.error('getReqWithToken ' + error.message)
            }else{
                reqTokenObj.headers[oAuthUtil.headerTokenMeta] = result.result.accessToken;
                reqTokenObj.headers.createTime = new Date().getTime();

            }
            callback(error,reqTokenObj)
        })
    }else if((reqTokenObj.headers.createTime +60*60*1000)<=new Date().getTime()){
        //refresh token

        refreshToken(function(error,result){
            if(error){
                logger.error('getReqWithToken ' + error.message)
            }else{
                reqTokenObj.headers[oAuthUtil.headerTokenMeta] = result.accessToken;
                reqTokenObj.headers.createTime = new Date().getTime();

            }
            callback(error,reqTokenObj);
        })
    }else{
        callback(null,reqTokenObj);
    }
}

function checkUserToken(rolesArray){
    function authCheck(req,res,next){
        httpUtil.httpPost(sysConfig.loginModuleUrl,'/api/roleBase',req,{rolesArray:rolesArray},function(error,result){
            if(result && result.success){
                return next();
            }else{
                resUtil.resNoAuthorizedError(sysMsg.ACCESS_TOKEN_ERROR, res, next);
            }
        })
    }
    return authCheck;


}

module.exports = {
    checkRolBase : checkRolBase ,
    getReqWithToken : getReqWithToken,
    checkUserToken  : checkUserToken
}
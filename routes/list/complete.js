var express = require('express');
var router = express.Router();
var pool = require('../../config/dbConfig');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const util = require('../../module/utils');

// /list/complete/:idx

router.get('/:idx', async(req,res)=>{
    
    let idx = req.params.idx;
    let getIdxListQuery = 'select * from summer.todolist WHERE idx=?';
    let getIdxListResult;
    

    try{
        var connection = await pool.getConnection();
        getIdxListResult = await connection.query(getIdxListQuery,[idx]);
        console.log(getIdxListResult);
    }catch(err){
        console.log(err);
        connection.rollback(()=>{});
        res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,resMessage.A_LIST_FAIL));
        next(err);
    }finally{
        pool.releaseConnection(connection);
    }

    let getComplete = getIdxListResult[0].complete;
    let completeUpdateQuery = 'UPDATE summer.todolist SET complete =? WHERE idx=?';
    let completeUpdateResult;

    try{
        var connection = await pool.getConnection();
        completeUpdateResult = await connection.query(completeUpdateQuery,[!getComplete, idx]);
        console.log(completeUpdateResult);
    }catch(err){
        console.log(err);
        connection.rollback(()=>{});
        res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,resMessage.COMPELTE_UPDATE_FAIL));
        next(err);
    }finally{
        pool.releaseConnection(connection);
        res.status(200).send(util.successTrue(statusCode.OK,resMessage.COMPELTE_UPDATE_SUCCESS));
    }s
    
})

module.exports = router;

var express = require('express');
var router = express.Router();
var pool = require('../../config/dbConfig');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const util = require('../../module/utils');
// /list/all
router.get('/',async(req,res)=>{
    let getAllListResult;
    try{
        var connection = await pool.getConnection();
        let getAllListQuery = 'SELECT * FROM summer.todolist';
        getAllListResult = await connection.query(getAllListQuery);
        console.log(getAllListResult);
        
    }catch(err){
        console.log(err);
        connection.rollback(()=>{});
        res.status(200).send(util.successFalse(statusCode.DB_ERROR,resMessage.ALL_LSIT_FAIL));
        next(err);
    }finally{
        pool.releaseConnection(connection);
        res.status(200).send(util.successTrue(statusCode.OK,resMessage.ALL_LIST_SUCCESS,getAllListResult));

    }
});

module.exports = router;

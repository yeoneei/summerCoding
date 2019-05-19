var express = require('express');
var router = express.Router();
var pool = require('../../config/dbConfig');
var moment = require('moment');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const util = require('../../module/utils');
// /list/expire
router.get('/',async(req,res)=>{
    let getAllListQuery = 'SELECT * FROM summer.todolist';
    let getAllListReuslt;
    try{
        var connection = await pool.getConnection();
        getAllListReuslt = await connection.query(getAllListQuery);
        console.log(getAllListReuslt);
    }catch(err){
        console.log(err);
        connection.rollback(()=>{});
        res.status(200).send(util.successFalse(statusCode.DB_ERROR,resMessage.ALL_LIST_FAIL));
        next(err);
    }

    let expireToDoList = new Array();
    for(key in getAllListReuslt){
        let tempDate = getAllListReuslt[key].dueDate;
        let diff = moment().diff(tempDate,"days");
        if(diff>0){
            expireToDoList.push(getAllListReuslt[key]);
        }
    }
    if(expireToDoList!=null){
        console.log(expireToDoList);
        pool.releaseConnection(connection);
        res.status(200).send(util.successTrue(statusCode.OK, resMessage.EXPIRE_LIST_SUCCESS,expireToDoList));
    }else{
        pool.releaseConnection(connection);
        res.status(200).send(util.successTrue(statusCode.OK, resMessage.EXPIRE_LIST_EMPTY));
    }
    


});

module.exports = router;

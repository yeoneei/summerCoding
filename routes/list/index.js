var express = require('express');
var router = express.Router();
var pool = require('../../config/dbConfig');
const statusCode = require('../../module/statusCode');
const resMessage = require('../../module/responseMessage');
const util = require('../../module/utils');

/* GET home page. */
// /list/all
router.use('/all',require('./all'));
router.use('/expire',require('./expire'));
router.use('/complete',require('./complete'));

// /list/
router.post('/',async(req,res)=>{
    // list 생성
    // 필수 필요한 것, title,content
    // 그외 필요한 것 prior compelete, dueDate
    /* 
        추가 해야 할 것 똑같은 이름의 리스트 차단
    */
    let title  = req.body.title;
    let content =req.body.content;
    let prior = req.body.prior ||null;
    let compelete = req.body.compelete || 0;
    let dueDate = req.body.dueDate ||null;
    console.log(title);
    console.log(content);

    if(!title || !content){
        // title 이나 content없으면 FAIL
        res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,resMessage.EMPTY_LIST));
    }else{
        let insertListQuery = "INSERT INTO summer.todolist (title, content, prior,complete,dueDate) VALUES (?,?,?,?,?)";
        let insertListResult;
        try{
            var connection = await pool.getConnection();
            insertListResult = await connection.query(insertListQuery,[title,content,prior,compelete,dueDate]);
            console.log(insertListResult);
        }catch(err){
            console.log(err);
            connection.rollback(()=>{});
            res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,resMessage.LIST_FAIL));
            next(err);
        }finally{
            pool.releaseConnection(connection);
            res.status(200).send(util.successTrue(statusCode.OK,resMessage.LIST_SUCCESS));
        }
    }
})

// 수정은 어떻게 할건지 나중에
router.put('/:idx',async(req,res)=>{
    let idx = req.params.idx;
    let title  = req.body.title;
    let content =req.body.content;
    let prior = req.body.prior ||null;
    let compelete = req.body.compelete || 0;
    let dueDate = req.body.dueDate ||null;
    let updateQuery  ='UPDATE summer.todolist SET title=?, content=?, prior=?,complete=?,dueDate=? WHERE idx=?';
    let updateResult;
    
    if(!title || !content){
        res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,resMessage.EMPTY_LIST));
    }else{
        try{
            var connetion = await pool.getConnection();
            updateResult = await connetion.query(updateQuery,[title,content,prior,compelete,dueDate,idx]);
            console.log(updateResult);
        }catch(err){
            console.log(err);
            connection.rollback(()=>{});
            res.status(200).send(util.successFalse(statusCode.BAD_REQUEST,resMessage.LIST_FAIL));
            next(err);
        }finally{
            pool.releaseConnection(connection);
            res.status(200).send(util.successTrue(statusCode.OK,resMessage.LIST_SUCCESS));
        }
    }
})

    
    
    

//삭제 
router.delete('/:idx' ,async(req,res)=>{
    let idx = req.params.idx;
    if(!idx){

    }else{
        let deleteQuery = 'DELETE FROM summer.todolist WHERE idx = ?';
        let deleteResult;
        try{
            var connection = await pool.getConnection();
            deleteResult = await connection.query(deleteQuery,[idx]);
        }catch(err){
            console.log(err);
            connection.rollback(()=>{});
            res.status(200).send(util.successFalse(statusCode.DB_ERROR,resMessage.LIST_DELETE_FAILE));

        }finally{
            pool.releaseConnection(connection);
            res.status(200).send(util.successTrue(statusCode.OK,resMessage.LIST_DELETE_SUCCESS));
        }

    }
})
module.exports = router;

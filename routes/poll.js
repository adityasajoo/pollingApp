const express = require('express');
const router = express.Router();
const voteController = require('../controller/vote.controller');


/**
 * @description Index Route
 * @Route GET '/'
 */
router.get("/",(req,res)=>{
    res.render("index",{layout:'main', title:'Polling App'});
    //res.send("Welcome");
});



/**
 * @description Add a poll
 * @Route POST '/vote'
 */
router.post("/vote",function(req,res){
    console.log(req.body);
    voteController.vote_add(req,res);
    res.status(200).send(req.body);
});


/**
 * @description Returns all the polls in the database
 * @Route GET '/data'
 */
router.get("/data", async function(req,res){
    const data = await voteController.get_all(req,res);
    res.send({"data":data});
    
});


/**
 *@description Returns the number of people voted for a choice in each day
 @Route GET '/count/:choice'  
 */
router.get("/count/:choice",async function(req,res){
    const choice = req.params.choice;
    console.log(choice);
    if(choice!='Yes' && choice !="No") return res.send("Invalid Parameter");

    const data = await voteController.date_count(choice);
    res.send({"data":data});
});


/**
 * @description Returns the number for people voted for each choice
 * @GET '/result'
 */
router.get("/result",async function(req,res){
    const data = await voteController.vote_count("Yes");
    res.send({"data":data});
});



module.exports = router;
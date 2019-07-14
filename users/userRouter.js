const express = require('express');
const router = require('express').Router();
const db = require('./userDb');
const dbPosts = require('../posts/postDb');

router.use(express.json());

router.post('/', validateUser, (req, res) => {
    db.insert(req.body)
    .then(newuser =>{
        res.status(201).json(newuser)
    })
    .catch(error =>{
        res.status(500).json(error)
    })
});

router.post('/:id/posts',validateUserId, (req, res) => {
    const {id} = req.params;
    const newPost = {
        text:req.body.text,
        user_id:id
    }
    dbPosts.insert(newPost)
    .then(post =>{
        res.status(201).json(post)
    })
    .catch(error =>{
        res.status(500).json(error)
    })
});

router.get('/', (req, res) => {
    db.get()
    .then(users =>{
        res.status(200).json(users)
    })
    .catch(error =>{
        res.status(500).json(error)
    })
});

router.get('/:id', validateUserId, (req, res) => {
    const {id} = req.params;
    db.getById(id)
    .then(user =>{
        res.status(200).json({user})
    })
    .catch(error =>{
        res.status(500).json(error)
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const {id} = req.params;
    db.getUserPosts(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error =>{
        res.status(500).json(error)
    })

});

router.delete('/:id', validateUserId, (req, res) => {
    const {id} = req.params;
    db.remove(id)
    .then(gone =>{
        res.status(204);
    })
    .catch(error =>{
        res.status(500).json({error: "The User could not be removed"})
    })
});

router.put('/:id', validateUserId, (req, res) => {
    const {id} = req.params;
    db.update(id, req.body)
    .then(updated =>{
        res.status(200).json(updated)
    })
    .catch(error =>{
    res.status(500).json({error: "The post information could not be modified."})
    })
});

//custom middleware

function validateUserId(req, res, next) {
    const {id} = req.params;
    db.getById(id)
    .then(user =>{
        if(user){
            next();
        }else{
            res.status(400).json({message:"Invlid User I.D."})
        }
    })
    .catch(error =>{
        res.status(500).json(error)
    })
};

function validateUser(req, res, next) {
    if(!req.body ){
        res.status(400).json({message: "missing post data"})
    }else if(!req.body.text) {
        res.status(400).json({message: "missing required text field"})
    }else{
        next()
    }
};

function validatePost(req, res, next) {
    if(!req.body ){
        res.status(400).json({message: "missing user data"})
    }else if(!req.body.name) {
        res.status(400).json({message: "missing required name field"})
    }else{
        next()
    }
};

module.exports = router;

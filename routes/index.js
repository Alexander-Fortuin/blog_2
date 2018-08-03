'use strict';

var express = require('express');
var router = express.Router();
var deleteRouter = require('../routes/delete');

//Can import directly
var Posts = require('../db.json');
var SidePosts = require('../bd.json');
var request = require('request');


// /////////////////////////
const pjson = require('../package.json');
// const express = require('express');
// const expressSanitizer = require('express-sanitizer');
// const ejs = require('ejs');
/////////////////////////////////////
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(Posts);
  res.render('index', { title: 'Home', blogs: Posts.posts, movies: Posts.sideposts});
});

/* GET Archive page. */
router.get('/archive', function(req, res, next) {
  console.log(Posts);
  res.render('archive', { title: 'Archive', blogs: Posts.posts, movies: Posts.sideposts});
});


/* GET View page. */
router.get('/view/:id', function(req, res, next) {

      let urlPath = req.path;
      let postVal = urlPath.slice(-1);

       res.render('view', { title: 'Read More', posts: Posts.posts[postVal -1] });

    });

router.get('/edit/:id', function(req, res, next) {

      let urlPath = req.path;
      let postVal = urlPath.slice(-1);

       res.render('edit', { title: 'Edit Post', posts: Posts.posts[postVal -1] });
    });


    // Route for delete
    /* GET create page. */
    router.get('/delete/:id', function(req, res, next) {
     console.log(req.params.id)
    //make a post request to our database
    request({
     uri: "http://localhost:8000/posts/"  + req.params.id,
     method: "DELETE",
     }, function(error, response, body) {
         let data = {
             message: 'Successfully Removed.',
         }

         res.redirect('..');
     });
    });

    // Route for update
    /* GET create page. */
    router.post('/update/:id', function(req, res, next) {
     //make a post request to our database
    request({
     uri: "http://localhost:8000/posts/"  + req.params.id,
     method: "PUT",
     form :{
       "title": req.body.title,
       "author": req.body.author,
       "time": req.body.time,
       "image": req.body.image,
       "content2": req.body.content2,
       "content": req.body.content,
     }
     }, function(error, response, body) {
         res.redirect('/');
     });
    });




// new Post
router.get('/newBlog', function(req, res, next) {
  res.render('newBlog', { title: 'blog'});
});


router.post('/newBlog', function(req, res, next){

  // variable for post
  let obj ={
    "title": req.body.title,
    "author": req.body.author,
    "time": req.body.time,
    "image": req.body.image,
    "content": req.body.content,
  }

  request.post({
    url:'http://localhost:8000/posts',
    body:obj,
    json:true
  }, function(error, response, body){
    res.redirect('/');
  });

});

router.post('/newBlog', function(req, res, next) {
  res.send(req.body);

});

/* GET create page. */
router.get('/newBlog', function(req, res, next) {

  res.render('newBlog', { title: "newBlog"});
  console.log(req.body);

});


// get sign in
router.post('/signUp', function(req, res, next){

  // variable for post
  let obj ={
    "name": req.body.name,
    "surname": req.body.surname,
    "email": req.body.email,
    "password": req.body.password,
  }

  request.post({
    url:'http://localhost:8000/user',
    body:obj,
    json:true
  }, function(error, response, body){
    res.redirect('/');
  });

});


/* GET Sign Up page. */
router.get('/signUp', function(req, res, next) {
  res.render('signUp', { title: 'signUp' });
});


router.post('/signUp', function(req, res, next) {
  res.send(req.body);

});

//////////////////////////////////////////////////////////////////////////////


module.exports = router;

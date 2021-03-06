var mongoose = require('mongoose');   
var User = mongoose.model('User');
var express = require('express');
var router = express.Router();

module.exports = function(passport){

	//sends successful login state back to the angulr
	router.get('/success', function (req, res){
		res.send({state: 'success', user:req.user ? req.user : null});
	});

	//sends failure login state back to angular
	router.get('/failure', function (req, res){
		res.send({ state: 'failure', user:null, message: "invalid username or password"});
	});

	//log in
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	//sign up
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	//logout
	router.get('/signout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
    //route to retain user details on client side
    router.get('/confirm-login', function(req, res) {
        res.send(req.user)
    });

	return router;
}	


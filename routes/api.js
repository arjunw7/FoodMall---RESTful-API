var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');   
var Menu = mongoose.model('Menu');
//Used for routes that must be authenticated.
// function isAuthenticated (req, res, next) {
//     // if user is authenticated in the session, call the next() to call the next request handler 
//     // Passport adds this method to request object. A middleware is allowed to add properties to
//     // request and response objects

//     //allow all get request methods
//     if(req.method === "GET"){
//         return next();
//     }
//     if (req.isAuthenticated()){
//         return next();
//     }

//     // if the user is not authenticated then redirect him to the login page
//     return res.redirect('/#login');
// };

//Register the authentication middleware
// router.use('/menu', isAuthenticated);

router.route('/menu')
    //adds a new item to menu
    .post(function(req, res){
        var newItem = new Menu();
        newItem.category = req.query.category;
        newItem.item_name = req.query.item_name;
        newItem.item_price = req.query.item_price;
        newItem.image_location = req.query.image_location;
        newItem.save(function(err, newItem) {
            if (err){
                return res.send(500, err);
            }
            return res.send(JSON.stringify(newItem));
        });
    })
    //gets the menu
    .get(function(req, res){
        Menu.find(function(err, menu){
            if(err){
                return res.writeHead(500, err);
            }
            return res.send(menu);
            console.log(menu);
        });
    });

router.route('/menu/:id')
    //gets specified post
    .get(function(req, res){
        Menu.findById(req.params.id, function(err, menu){
            if(err)
                res.send(err);
            res.json(menu);
        });
    })
    .put(function(req, res){
        Menu.findById(req.params.id, function(err, menu){
            if(err)
                res.send(err);

            menu.category = req.query.category;
            menu.item_name = req.query.item_name;
            menu.item_price = req.query.item_price;
            menu.image_location = req.query.image_location;
            menu.save(function(err, menu){
                if(err)
                    res.send(err);

                res.json(menu);
            });
        });
    }) 
    .delete(function(req, res){
        Menu.remove({
            _id: req.params.id
        }, function(err) {
            if (err)
                res.send(err);
            res.json("deleted :(");
        });
    })

module.exports = router;
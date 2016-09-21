var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport'); 
var async = require('async');
var crypto = require('crypto');
var bCrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');
var msg91 = require("msg91")("116142AQGxO25kEXN57658c70", "SASITR", 4 );  
var Menu = mongoose.model('Menu');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
var OrderHistory = mongoose.model('OrderHistory');
//Used for routes that must be authenticated.
// function isAuthenticated (req, res, next) {
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
// router.use('/orderHistory', isAuthenticated);
//sends successful login state back to the angulr
var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

router.route('/menu')

    //gets the menu
    .get(function(req, res){
        Menu.find(function(err, menu){
            if(err){
                return res.writeHead(500, err);
            }
            return res.send(menu);
        });
    })
   
     //adds a new item to menu
    .post(function(req, res){
        var newItem = new Menu();
        newItem.category = req.body.category;
        newItem.item_name = req.body.item_name;
        newItem.item_price = req.body.item_price;
        // newItem.image_location = "/images/menu" + req.body.category +;
        newItem.save(function(err, newItem) {
            if (err){
                return res.send(500, err);
            }
            return res.send(JSON.stringify(newItem));
        });
    });

router.route('/users')
    //gets all users
    .get(function(req, res){
        User.find(function(err, user){
            if(err){
                return res.writeHead(500, err);
            }
            return res.send(user);
        });
    });

router.route('/order')

    .post(function(req, res){
        var newOrder = new Order();
        newOrder.item_name = req.body.item_name;
        newOrder.item_price = req.body.item_price;
        newOrder.quantity = newOrder.quantity+1;
        newOrder.save(function(err, newItem) {
            if (err){
                return res.send(500, err);
            }
            return res.send(JSON.stringify(newOrder));
        });
    })
    //gets all users
    .get(function(req, res){
        Order.find(function(err, order){
            if(err){
                return res.writeHead(500, err);
            }
            return res.send(order);
        });
    })
    .delete(function(req, res){
        Order.remove({}, function(err) {
            if (err)
                res.send(err);
            res.json("deleted");
        });
    });

router.route('/order/:id')
    //gets specified post
     .delete(function(req, res){
        Order.remove({
            _id: req.params.id
        }, function(err) {
            if (err)
                res.send(err);
            res.json("Order deleted");
        });
    })
    .put(function(req, res){
        Menu.findById(req.params.id, function(err, order){
            if(err)
                res.send(err);    
            order.quantity = order.quantity+1;
            order.save(function(err, order){
                if(err)
                    res.send(err);

                res.json(order);
            });
        });
    }) 

router.route('/users/:id')
    
    //deletes a user
    .delete(function(req, res){
        User.remove({
            _id: req.params.id
        }, function(err) {
            if (err)
                res.send(err);
            res.json("Use deleted");
        });
    });
 

router.route('/orderHistory')

    .post(function(req, res){
        var orderHistory = new OrderHistory();
        orderHistory.order_by = req.body.order_by;
        orderHistory.amount = req.body.amount;
        orderHistory.save(function(err, orderHistory) {
            if (err){
                return res.send(500, err);
            }
            return res.send(JSON.stringify(orderHistory));
        });
    })
    //gets the menu
    .get(function(req, res){
        OrderHistory.find(function(err, orderHistory){
            if(err){
                return res.writeHead(500, err);
            }
            return res.send(orderHistory);
        });
    })
    .delete(function(req, res){
        OrderHistory.remove({}, function(err) {
            if (err)
                res.send(err);
            res.json("deleted");
        });
    });


router.route('/menu/:id')
    //gets specified post
    .post(function (req, res){
        Menu.findById(req.params.id, function(err, menu){
            if(err)
                res.send(err);
            var newOrder = new Order();
            newOrder.item_name = menu.item_name;
            newOrder.item_price = menu.item_price;
            res.json(newOrder._id);

        })
        
    })
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
            res.json("Item deleted");
        });
    });

router.route('/forgot')
    .post(function(req, res, next) {
      async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          User.findOne({ email: req.body.email }, function(err, user) {
            if (!user) {
              return res.redirect('/forgotPassword');
            }

            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
        function(token, user, done) {
          var smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
              user: 'arjunw7@gmail.com',
              pass: '9943130589'
            }
          });
          var mailOptions = {
            to: user.email,
            from: 'Food Mall VITU',
            subject: 'Foodmall Account Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '#/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            done(err, 'done');
            console.log("Mail sent")
          });
          var mobileNo = "9042099195";
          msg91.send(mobileNo, "Dear Customer, your taxi booking from Vellore to Chennai Airport has been successfully confirmed. Call 9899865658 for travel details.", function(err, response){
            console.log(err);
            console.log(response);
          });
        }
      ], function(err) {
        if (err) return next(err);
      });
    });

router.route('/reset/:token')
    .get(function(req, res) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
         console.log('Password reset token is invalid or has expired.');
          return res.redirect('/forgot');
        }
        res.redirect('/reset')
      });
    })

    .post(function(req, res) {
      async.waterfall([
        function(done) {
          User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
              console.log('Password reset token is invalid or has expired.');
              return res.redirect('back');
            }
            console.log(user.username);
            user.password = createHash(req.body.password);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          });
        },
        function(user, done) {
          var smtpTransport = nodemailer.createTransport('SMTP', {
            service: 'Gmail',
            auth: {
              user: 'arjunw7@gmail.com',
              pass: '9943130589'
            }
          });
          var mailOptions = {
            to: user.email,
            from: 'Food Mall VITU',
            subject: 'Password reset successful',
            text: 'Hello,\n\n' +
              'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
          };
          smtpTransport.sendMail(mailOptions, function(err) {
            console.log('Success! Your password has been changed.');
            done(err);
          });
        }
      ], function(err) {
        res.redirect('/');
      });
});

module.exports = router;
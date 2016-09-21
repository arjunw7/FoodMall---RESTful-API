var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    username: String,
    password: String, //hash created from password
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

var ordersSchema = new mongoose.Schema({
    order_by: String,
    order_time: {type: Date, default: Date.now},
    item_name: String,
    item_price: Number,
    quantity: {type: Number, default: 0}
});

var orderHistorySchema = new mongoose.Schema({
    order_by: String,
    amount: {type: Number, default: 0}, 
    order_time: {type: Date, default: Date.now}
});

var menuSchema = new mongoose.Schema({
	category: String,
	item_name: String,
	item_price: Number,
	image_location: String
});

mongoose.model('Menu', menuSchema);
mongoose.model('Order', ordersSchema);
mongoose.model('User', userSchema);
mongoose.model('OrderHistory', orderHistorySchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String //hash created from password
});

var ordersSchema = new mongoose.Schema({
    order_by: { type: Schema.ObjectId, ref: 'User' },
    order_time: {type: Date, default: Date.now},
    order_amount: Number
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
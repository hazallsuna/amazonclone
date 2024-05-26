const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('CartItem', CartItemSchema);



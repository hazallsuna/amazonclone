const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const CartItem = require("./CartItem.js");

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// connection url
const connection_url = "mongodb+srv://hazal:123qweasd@cluster0.ljmulei.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(connection_url)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// API
app.get("/", (req, res) => res.status(200).send("Ana Sayfa"));

// Sepete ürün ekleme
app.post("/cart/add", async (req, res) => {
  const { id, title, price, image, rating } = req.body;

<<<<<<< HEAD
  try {
    let cartItem = await CartItem.findOne({ id });
=======
//URUN EKLE
app.post("/products/add", (req, res) => {
  console.log(req)
  const productDetail = req.body;
>>>>>>> b8f4aff905b74ff6297de9d82fe3a719afacffa1

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cartItem = new CartItem({ id, title, price, image, rating });
    }

<<<<<<< HEAD
    const savedItem = await cartItem.save();
    console.log('Item added to cart successfully:', savedItem);
    res.status(201).send(savedItem);
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.status(500).send('Error adding item to cart');
  }
=======
  Products.create({productDetail}).then(
    function(){
      console.log('Product created:', productDetail);
      res.status(201).send(productDetail);
    }
  ).catch(
    function(err){
      console.log("Error",err);
    }
  );
>>>>>>> b8f4aff905b74ff6297de9d82fe3a719afacffa1
});


// Sepetten ürün silme
app.delete("/cart/remove/:id", async (req, res) => {
  const id = req.params.id;
  try {
    console.log(`Deleting item with id: ${id}`);
    const result = await CartItem.findOneAndDelete({ id }); // Use _id if id is stored in MongoDB's ObjectId field
    if (result) {
      res.status(200).send("Ürün başarıyla silindi.");
    } else {
      res.status(404).send("Ürün bulunamadı.");
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send("Bir hata oluştu.");
  }
});

app.get("/getCart", async (req, res)=>{
  try {
    const items = await CartItem.find()
    console.log(items)
    res.status(200).send(items)
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => console.log("Listening on port", port));

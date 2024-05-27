const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const CartItem = require("./CartItem.js");
const Orders = require("./Orders.js");
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const Users = require("./Users");
const bcrypt = require("bcryptjs");
app.use(bodyParser.json());
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

  try {
    let cartItem = await CartItem.findOne({ id });

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cartItem = new CartItem({ id, title, price, image, rating });
    }

    const savedItem = await cartItem.save();
    console.log('Ürün sepete eklendi', savedItem);
    res.status(201).send(savedItem);
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.status(500).send('Error adding item to cart');
  }
});


// Sepetten ürün silme
app.delete("/cart/remove/:id", async (req, res) => {
  const id = req.params.id;
  try {
    console.log(`Deleting item with id: ${id}`);
    const result = await CartItem.findOneAndDelete({ id }); 
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



// Sipariş Ekleme
app.post("/orders/add", async (req, res) => {
  const products = req.body.products;
  const price = req.body.price;
  const email = req.body.email;
  const address = req.body.address;

  const orderDetail = {
    products: products,
    price: price,
    address: address,
    email: email,
  };
  
   try{
     
   const response = await Orders.create(orderDetail);
   res.status(201).send("oluştu");
  }catch(error)
  {
    console.log(error);
  }

});

//Sipariş Özeti
app.post("/orders/get", async (req, res) => {
  const email = req.body.email;

  try {
    const result = await Orders.find();
    const userOrders = result.filter((order) => order.email === email);
    res.status(200).send(userOrders);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Siparişler alınırken bir hata oluştu" });
  }
});


//Kayıt ol
app.post("/auth/signup", async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    const encrypt_password = await bcrypt.hash(password, 10);

    const userDetail = {
      email: email,
      password: encrypt_password,
      fullName: fullName,
    };

    const user_exist = await Users.findOne({ email: email });

    if (user_exist) {
      return res.status(400).send({ message: "The Email is already in use !" });
    }

    const user = new Users(userDetail);
    const savedUser = await user.save();

    res.status(201).send({ message: "User Created Successfully", user: savedUser });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Giriş Yap
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDetail = await Users.findOne({ email: email });
    if (userDetail) {
      const isPasswordCorrect = await bcrypt.compare(password, userDetail.password);
      if (isPasswordCorrect) {
        res.send(userDetail);
      } else {
        res.status(401).send({ error: "Invalid password" });
      }
    } else {
      res.status(404).send({ error: "User does not exist" });
    }
  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).send({ error: "Internal server error" });
  }
});




app.listen(port, () => console.log("Listening on port", port));

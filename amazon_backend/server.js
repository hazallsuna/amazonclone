const express = require("express");
const cors = require("cors");
const mongoose = require ("mongoose");
const Products = require ("./Products");


const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

//connection url
const connection_url = "mongodb+srv://hazalsuna8:123qweasd@cluster0.ysjcrsq.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log('MongoDB connection error:', err));


//API
app.get("/",(req,res) => res.status(200).send("Ana Sayfa"));

//URUN EKLE
app.post("/products/add", (req, res) => {
  const productDetail = req.body;

  console.log("Product Detail >>>>", productDetail);

  Products.create(productDetail, (err, data) => {
      if (err) {
         console.error('Error:', err); 
         res.status(500).send(err.message);
      } else {
          console.log('Product created:', data);
          res.status(201).send(data);
      }
  });
});


app.listen(port,() => console.log("listening on the port",port));
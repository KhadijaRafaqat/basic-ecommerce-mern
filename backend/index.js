const express = require("express");
require("./db/config");

const User = require("./model/User");
const Product = require("./model/Product");
const app = express();

app.use(express.json());

// ======================
// Register API
// ======================

app.post("/register", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();

    result = result.toObject(); //converts mongoose document to normal JS object
    delete result.password; //removes the password from that object.

    res.status(201).send(result);
  } catch (err) {
    
    if (err.code === 11000) {
      return res.status(400).send({
     
        success: false,
        message: "Email already exists.",
      });
    }
    res.status(500).send({
    
      success: false,
      message: "Something went wrong.",
      error: err.message,
    });
  }
});

// ======================
// Login API
// ======================


app.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    let user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    }).select("-password");//return the user, but exclude the password field.

    if (user) {
      res.status(200).send({
        success: true,
        user,
      });
    } else {
      res.status(401).send({
        success: false,
        message: "Invalid email or password.",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Something went wrong.",
      error: err.message,
    });
  }
});


// ======================
// Add Product API
// ======================

app.post("/add-product", async (req, res) => {
    try {
        let product = new Product(req.body);

        let result = await product.save();

        res.status(201).send({
            success: true,
            product: result
        });

    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Unable to add product.",
            error: err.message
        });
    }
});

// ======================
// Get Product API
// ======================

app.get('/products', async(req,res)=>{
    try{
        const products= await Product.find();
        res.status(200).send({
            success:true,
            products
        });

    }catch(err){
        res.status(500).send({
            succes:false,
            message:"Unabel to fetch products.",
            error:err.message,
        })
    }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
